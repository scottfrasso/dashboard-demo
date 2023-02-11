import { Controller, Get, Param } from '@nestjs/common'

import { AuthorizedUser, PostDTO } from '@dashboard/dtos'

import { PostsService } from './post.service'
import { User } from '../decorators'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@User() user: AuthorizedUser): Promise<PostDTO[]> {
    return await this.postsService.getPosts(user.userId)
  }

  @Get(':postId')
  async getPostById(
    @User() user: AuthorizedUser,
    @Param('postId') postId: number,
  ): Promise<PostDTO> {
    return await this.postsService.getPost(user.userId, postId)
  }
}
