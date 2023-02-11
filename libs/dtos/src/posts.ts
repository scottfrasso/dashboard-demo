export type PostDTO = {
  id: number
  groupId: number
  imageURL?: string
  content?: string

  createdAt: string
}

export type ReactionTypeDTO = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'

export type ReactionDTO = {
  id: number
  emoji: string
  userId: number
}
