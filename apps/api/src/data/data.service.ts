import { Prisma } from '@prisma/client'

export class DataService {
  /**
   * Given a userId construct the where clause for the group query
   * @param userId
   * @returns
   */
  public static whereClauseForGroupMembers(
    userId: number,
  ): Prisma.GroupWhereInput[] {
    return [
      {
        isPublic: true,
      },
      {
        groupMembers: {
          some: {
            userId: userId,
          },
        },
      },
    ]
  }
}
