import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  avatar: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];
}
