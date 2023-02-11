import { Inject, Injectable } from '@nestjs/common'

import { PrismaClient } from '@prisma/client'
import { UserMeResponseDTO, UserRoleDTO } from '@dashboard/dtos'

import { PRISMA_PROVIDER_NAME } from 'src/provider-names'

@Injectable()
export class UsersService {
  constructor(
    @Inject(PRISMA_PROVIDER_NAME) private readonly prismaClient: PrismaClient,
  ) {}

  async findOneByEmail(email: string): Promise<UserMeResponseDTO | undefined> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        email: email.toLowerCase().trim(),
      },
    })

    if (!user) {
      return undefined
    }

    return {
      id: user.id,
      // TODO: Pull this from the DB
      role: UserRoleDTO.Admin,
      email: user.email,
      fullName: user.name,
    }
  }
}
