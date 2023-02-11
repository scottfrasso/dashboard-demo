import { Module } from '@nestjs/common'

import { DataModule } from '../data/data.module'
import { PostsService } from './post.service'
import { PostsController } from './post.controller'

@Module({
  imports: [DataModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
