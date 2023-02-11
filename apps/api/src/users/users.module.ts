import { Module } from '@nestjs/common'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { DataModule } from '../data/data.module'

@Module({
  imports: [DataModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
