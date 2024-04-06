import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';

@Entity()
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { length: 20000 })
  text: string;

  @Column()
  author: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
  @ManyToOne(() => Category, (category) => category.posts)
  category: Category;
}
