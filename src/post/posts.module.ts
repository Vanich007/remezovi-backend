import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostEntity } from './post.entity';
import { User } from '../user/user.entity';
import { UsersService } from '../user/users.service';
import { Category } from '../category/category.entity';
import { CategoriesService } from '../category/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, User, Category])],
  providers: [PostsService, UsersService, CategoriesService],
  controllers: [PostsController],
})
export class PostsModule {}
