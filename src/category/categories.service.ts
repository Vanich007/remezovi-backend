import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Category } from './category.entity';

import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categorysRepository: Repository<Category>,
  ) {}

  async add(createCategoryDto: CreateCategoryDto): Promise<InsertResult> {
    const category = new Category();
    if (!category) return;
    category.name = createCategoryDto.name;
    return await this.categorysRepository.upsert(category, ['id']);
  }

  findAll(): Promise<Category[]> {
    return this.categorysRepository.find();
  }

  findOne(id: number): Promise<Category | null> {
    return this.categorysRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.categorysRepository.delete(id);
  }
}
