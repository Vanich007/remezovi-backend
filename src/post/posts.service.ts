import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PatchPostDto } from './dto/patch-post.dto';
import { UsersService } from '../user/users.service';
import { CategoriesService } from '../category/categories.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
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
    if (!createPostDto.author) return;
    const user = await this.usersService.findOne(createPostDto.author);
    const category = await this.categoriesService.findOne(
      createPostDto.category,
    );
    const post = new PostEntity();
    post.text = createPostDto.text;
    post.title = createPostDto.title;
    post.author = createPostDto.author;
    post.user = user;
    post.category = category;
    await this.postsRepository.save(post);
  }
  async patch(patchPostDto: PatchPostDto): Promise<any> {
    return await this.postsRepository.save(patchPostDto);
    // const post = new PostEntity();
    // post.text = patchPostDto.text;
    // post.title = patchPostDto.title;
    // post.author = patchPostDto.author;
    // await this.postsRepository.save(post);
  }
  async getPostById(postId: number): Promise<PostEntity> {
    const post = await PostEntity.findOne({
      where: { id: postId },
      relations: ['user', 'category'],
    });
    return post;
  }
  async getPosts(
    take: number,
    skip: number,
    category: number,
  ): Promise<{ posts: PostEntity[]; count: number }> {
    const cat = await this.categoriesService.findOne(category);
    const posts = await PostEntity.find({
      where: category ? { category: cat } : undefined,
      relations: ['user', 'category'],
      take,
      skip,
      order: { id: 'ASC' },
    });
    const count = await PostEntity.count();
    return { posts, count };
  }
}
