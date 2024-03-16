import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('add')
  post(@Body() body): Promise<void> {
    return this.postsService.add(body);
  }
  @Delete('delete')
  delete(@Query() { id }): Promise<void> {
    return this.postsService.remove(id);
  }
  @Patch('patch')
  patch(@Body() body): Promise<void> {
    return this.postsService.patch(body);
  }
  @Get('post')
  getPostBiId(@Query() { id }): Promise<PostEntity> {
    return this.postsService.getPostById(id);
  }
  @Get('posts')
  getPosts(@Query() { count, skip }): Promise<{ posts: PostEntity[] }> {
    return this.postsService.getPosts(count, skip);
  }
}
