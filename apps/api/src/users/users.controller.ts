import { Controller, Request, Get, UseGuards } from '@nestjs/common'

import { AuthorizedUser, UserMeResponseDTO } from '@dashboard/dtos'

import { User } from '../decorators/user.decorator'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async login(@User() user: AuthorizedUser): Promise<UserMeResponseDTO> {
    return await this.usersService.findOneByEmail(user.email)
  }
}
