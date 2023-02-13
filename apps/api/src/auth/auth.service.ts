import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AuthCredentialsDTO, JWTPayload } from '@dashboard/dtos'

import { comparePassword } from '../utils/encryption'
import { PrismaClient } from '@prisma/client'
import { PRISMA_PROVIDER_NAME } from '../provider-names'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(PRISMA_PROVIDER_NAME) private readonly prismaClient: PrismaClient,
  ) {}

  async login(email: string, password: string): Promise<AuthCredentialsDTO> {
    const user = await this.prismaClient.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    })
    if (!user) {
      throw new Error('User not found')
    }

    const passwordMatch = await comparePassword(password, user.password)
    if (!passwordMatch) {
      throw new Error('Invalid password')
    }

    const payload = { email: user.email, userId: user.id } as JWTPayload
    return {
      authToken: this.jwtService.sign(payload),
    } as AuthCredentialsDTO
  }
}
