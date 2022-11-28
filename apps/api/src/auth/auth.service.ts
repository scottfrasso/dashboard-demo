import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AuthCredentialsDTO, JWTPayload } from '@dashboard/dtos'

import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthCredentialsDTO> {
    const user = await this.usersService.findOneByEmail(email)
    if (!user || user.password !== password) {
      // TODO: Better error handling
      throw new Error('User not found')
    }

    const payload = { email: user.email } as JWTPayload
    return {
      authToken: this.jwtService.sign(payload),
    } as AuthCredentialsDTO
  }
}
