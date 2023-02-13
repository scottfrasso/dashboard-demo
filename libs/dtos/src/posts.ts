import { UserDTO } from './users'

export type PostDTO = {
  id: number
  groupId: number
  imageURL?: string
  content?: string

  createdAt: string

  author: UserDTO
}

export type ReactionTypeDTO = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'

export type ReactionDTO = {
  id: number
  emoji: string
  userId: number
}

// TODO: Add validation so we don't have null posts
export type CreatePostDTO = {
  groupId: number
  imageURL?: string
  content?: string
}
