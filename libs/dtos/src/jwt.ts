export type JWTPayload = {
  userId: string
  email: string
}

export type AuthorizedUser = JWTPayload
