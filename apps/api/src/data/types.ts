import { Post, User } from '@prisma/client'

// Posts
export type PostWithAuthor = Post & {
  author: User
}
