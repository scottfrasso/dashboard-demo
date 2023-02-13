import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { GroupsModule } from './groups/group.module'
import { PostsModule } from './posts/post.module'

@Module({
  imports: [AuthModule, UsersModule, GroupsModule, PostsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
