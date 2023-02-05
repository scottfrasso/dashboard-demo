import { Controller, Post, Body } from '@nestjs/common'

import { AuthCredentialsDTO, LoginDTO } from '@dashboard/dtos'

import { Public } from '../decorators/ispublic'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDTO): Promise<AuthCredentialsDTO> {
    return await this.authService.login(loginDto.email, loginDto.password)
  }
}
