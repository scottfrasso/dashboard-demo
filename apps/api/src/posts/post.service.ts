import { PostDTO } from '@dashboard/dtos'
import { Inject, Injectable } from '@nestjs/common'

import { Post, PrismaClient } from '@prisma/client'

import { DataService } from 'src/data/data.service'
import { PRISMA_PROVIDER_NAME } from 'src/provider-names'

@Injectable()
export class PostsService {
  constructor(
    @Inject(PRISMA_PROVIDER_NAME) private readonly prismaClient: PrismaClient,
  ) {}

  public static postToPostDTO(post: Post): PostDTO {
    return {
      id: post.id,
      groupId: post.groupId,
      imageURL: post.imageURL,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
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
        reactions: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    })

    return posts.map((post: Post) => PostsService.postToPostDTO(post))
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
        reactions: true,
      },
    })

    if (!post) {
      throw new Error('Post not found')
    }

    return PostsService.postToPostDTO(post)
  }
}
