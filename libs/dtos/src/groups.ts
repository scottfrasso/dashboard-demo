export type GroupDTO = {
  id: number
  name: string
  isPublic: boolean
}

export type GroupRoleDTO = 'admin' | 'member'

export type GroupMemberDTO = {
  userId: number
  groupId: number
  role: GroupRoleDTO
}
