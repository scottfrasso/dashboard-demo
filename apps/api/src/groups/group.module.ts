import { Module } from '@nestjs/common'

import { DataModule } from '../data/data.module'
import { GroupsService } from './group.service'
import { GroupsController } from './group.controller'

@Module({
  imports: [DataModule],
  providers: [GroupsService],
  controllers: [GroupsController],
})
export class GroupsModule {}
