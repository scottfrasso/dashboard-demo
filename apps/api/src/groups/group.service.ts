import { Inject, Injectable } from '@nestjs/common'

import { Group, GroupMembership, PrismaClient, Prisma } from '@prisma/client'
import { GroupDTO, GroupMemberDTO } from '@dashboard/dtos'

import { PRISMA_PROVIDER_NAME } from '../provider-names'
import { DataService } from 'src/data/data.service'

@Injectable()
export class GroupsService {
  constructor(
    @Inject(PRISMA_PROVIDER_NAME) private readonly prismaClient: PrismaClient,
  ) {}

  public static groupToGroupDTO(group: Group): GroupDTO {
    return {
      id: group.id,
      name: group.name,
      isPublic: group.isPublic,
    }
  }

  public static groupMemberToGroupMemberDTO(
    groupMember: GroupMembership,
  ): GroupMemberDTO {
    return {
      userId: groupMember.userId,
      groupId: groupMember.groupId,
      role: groupMember.role as GroupMemberDTO['role'],
    }
  }

  /**
   * Get the groups that are public and that I'm a member of
   * @returns All public groups
   */
  public async getGroups(userId: number): Promise<GroupDTO[]> {
    const groups = await this.prismaClient.group.findMany({
      where: {
        OR: DataService.whereClauseForGroupMembers(userId),
      },
    })

    return groups.map((group) => GroupsService.groupToGroupDTO(group))
  }

  /**
   * Get a group by ID
   * @param groupId
   * @returns The group
   */
  public async getGroup(userId, groupId: number): Promise<GroupDTO> {
    const group = await this.prismaClient.group.findFirst({
      where: {
        OR: DataService.whereClauseForGroupMembers(userId),
        AND: {
          id: groupId,
        },
      },
    })

    if (!group) {
      throw new Error('Group not found or user does not have access.')
    }

    return GroupsService.groupToGroupDTO(group)
  }

  /**
   * Get the members of a group
   * @param groupId
   * @returns
   */
  public async getGroupMembers(
    userId,
    groupId: number,
  ): Promise<GroupMemberDTO[]> {
    const group = await this.prismaClient.group.findFirst({
      where: {
        OR: DataService.whereClauseForGroupMembers(userId),
        AND: {
          id: groupId,
        },
      },
      include: {
        groupMembers: true,
      },
    })
    if (!group) {
      // TODO: Logging and better error handling
      throw new Error('Group not found or user does not have access.')
    }

    return group.groupMembers.map((member) =>
      GroupsService.groupMemberToGroupMemberDTO(member),
    )
  }
}
