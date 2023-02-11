export enum UserRoleDTO {
  Admin = 'admin',
}

export type UserMeResponseDTO = {
  id: number
  role: UserRoleDTO
  email: string
  fullName: string
  avatar?: string
}
