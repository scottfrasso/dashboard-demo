import { Controller, Get, Param } from '@nestjs/common'

import { AuthorizedUser, GroupDTO, GroupMemberDTO } from '@dashboard/dtos'

import { User } from '../decorators/user.decorator'
import { GroupsService } from './group.service'

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}

  @Get()
  async login(@User() user: AuthorizedUser): Promise<GroupDTO[]> {
    return await this.groupService.getGroups(user.userId)
  }

  @Get(':groupId')
  async getGroupById(
    @User() user: AuthorizedUser,
    @Param('groupId') groupId: number,
  ): Promise<GroupDTO> {
    return await this.groupService.getGroup(user.userId, groupId)
  }

  @Get(':groupId/members')
  async getGroupMembers(
    @User() user: AuthorizedUser,
    @Param('groupId') groupId: number,
  ): Promise<GroupMemberDTO[]> {
    return await this.groupService.getGroupMembers(user.userId, groupId)
  }
}
