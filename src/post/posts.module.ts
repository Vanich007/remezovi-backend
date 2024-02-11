import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostEntity } from './post.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, User])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
