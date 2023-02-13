import { PostDTO, CreatePostDTO } from '@dashboard/dtos'

import { ApiClient } from './api-client'

export class Posts {
  private readonly api: ApiClient

  constructor(api: ApiClient) {
    this.api = api
  }

  public async getPost(postId: number): Promise<PostDTO> {
    return await this.api.callAPI<void, PostDTO>('GET', `posts/${postId}`)
  }

  public async getPosts(): Promise<PostDTO[]> {
    return await this.api.callAPI<void, PostDTO[]>('GET', 'posts')
  }

  public async createPost(post: CreatePostDTO): Promise<PostDTO> {
    return await this.api.callAPI<CreatePostDTO, PostDTO>('POST', 'posts', post)
  }
}
