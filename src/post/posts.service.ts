import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  findAll(): Promise<PostEntity[]> {
    return this.postsRepository.find();
  }

  findOne(id: number): Promise<PostEntity | null> {
    return this.postsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
  async add(createPostDto: CreatePostDto): Promise<void> {
    const post = new PostEntity();
    post.text = createPostDto.text;
    post.title = createPostDto.title;
    post.author = createPostDto.author;
    await this.postsRepository.save(post);
  }
  async getPostById(postId: number): Promise<PostEntity> {
    const post = await PostEntity.findOne({
      where: { id: postId },
      relations: ['users'],
    });
    return post;
  }
}
