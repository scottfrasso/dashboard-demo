export enum UserRoleDTO {
  Admin = 'admin',
}

export type UserDTO = {
  id: number
  role: UserRoleDTO
  fullName: string
  avatar?: string
}

export type UserMeResponseDTO = UserDTO & {
  email: string
}
