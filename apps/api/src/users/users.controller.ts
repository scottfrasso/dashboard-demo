import { Controller, Request, Get, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../auth/jtw-auth-guard'

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async login(@Request() req) {
    return req.user
  }
}
