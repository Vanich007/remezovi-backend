import { Entity, Column, PrimaryColumn, OneToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from '../post/post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => PostEntity, (post) => post.category)
  posts: PostEntity[];
}
