export type JWTPayload = {
  userId: number
  email: string
}

export type AuthorizedUser = JWTPayload
