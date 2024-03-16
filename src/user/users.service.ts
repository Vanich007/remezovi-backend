import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from "typeorm";
import { User } from './user.entity';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async add(createUserDto: CreateUserDto): Promise<InsertResult> {
    const user = new User();
    if (!user) return;
    user.avatar = createUserDto.avatar;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.id = createUserDto.id;
    return await this.usersRepository.upsert(user, ['id']);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
