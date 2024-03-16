import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { InsertResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add')
  post(@Body() body): Promise<InsertResult> {
    return this.usersService.add(body);
  }
  @Get('all')
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
