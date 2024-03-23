import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { InsertResult } from 'typeorm';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('add')
  post(@Body() body): Promise<InsertResult> {
    return this.categoriesService.add(body);
  }
  @Get('all')
  getAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}
