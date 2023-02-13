import { Inject, Injectable } from '@nestjs/common'

import { PrismaClient } from '@prisma/client'
import { PostDTO, CreatePostDTO, UserRoleDTO } from '@dashboard/dtos'

import { DataService } from '../data/data.service'
import { PRISMA_PROVIDER_NAME } from '../provider-names'
import { winston } from '../utils/logger'
import { PostWithAuthor } from '../data/types'

const logger = winston.child({ module: 'PostsService' })

@Injectable()
export class PostsService {
  constructor(
    @Inject(PRISMA_PROVIDER_NAME) private readonly prismaClient: PrismaClient,
  ) {}

  public static postToPostDTO(post: PostWithAuthor): PostDTO {
    return {
      id: post.id,
      groupId: post.groupId,
      imageURL: post.imageURL,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      author: {
        id: post.author.id,
        fullName: post.author.name,
        role: 'admin', // TODO: Get role from the database
      },
    }
  }

  private async getGroupIds(userId: number): Promise<number[]> {
    const groups = await this.prismaClient.group.findMany({
      where: {
        OR: DataService.whereClauseForGroupMembers(userId),
      },
    })

    return groups.map((group) => group.id)
  }

  async getPosts(userId: number): Promise<PostDTO[]> {
    // TODO: Pagination
    const posts = await this.prismaClient.post.findMany({
      where: {
        groupId: {
          in: await this.getGroupIds(userId),
        },
        published: true,
      },
      include: {
        author: true,
        reactions: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    })

    return posts.map((post: PostWithAuthor) => PostsService.postToPostDTO(post))
  }

  async getPost(userId: number, postId: number): Promise<PostDTO> {
    const post = await this.prismaClient.post.findFirst({
      where: {
        groupId: {
          in: await this.getGroupIds(userId),
        },
        id: postId,
        published: true,
      },
      include: {
        author: true,
        reactions: true,
      },
    })

    if (!post) {
      throw new Error('Post not found')
    }

    return PostsService.postToPostDTO(post)
  }

  async createPost({
    userId,
    post,
  }: {
    userId: number
    post: CreatePostDTO
  }): Promise<PostDTO> {
    let createdPost: PostWithAuthor
    logger.info('Creating post', { userId, post })
    try {
      createdPost = await this.prismaClient.post.create({
        include: {
          author: true,
        },
        data: {
          content: post.content,
          imageURL: post.imageURL,
          groupId: post.groupId,
          authorId: userId,
          published: true,
        },
      })
    } catch (error) {
      logger.error(error)
      throw new Error('Error creating post')
    }

    return PostsService.postToPostDTO(createdPost)
  }
}
