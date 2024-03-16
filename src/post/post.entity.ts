import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  author: number;

  // @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  // dateField: Date;
  // @CreateDateColumn()
  // created_at: Date;
  //
  // @UpdateDateColumn({ name: 'updated_at' })
  // updatedAt: Date;
  //
  // @DeleteDateColumn({ name: 'deleted_at' })
  // deletedAt: Date;


  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
