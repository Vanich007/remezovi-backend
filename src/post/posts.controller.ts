import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('add')
  post(@Body() body): Promise<void> {
    return this.postsService.add(body);
  }
  @Get('getpostbyid')
  get(@Param() param): Promise<PostEntity> {
    return this.postsService.getPostById(param);
  }
}
