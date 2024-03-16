import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostEntity } from './post.entity';
import { User } from '../user/user.entity';
import { UsersService } from '../user/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, User])],
  providers: [PostsService, UsersService],
  controllers: [PostsController],
})
export class PostsModule {}
