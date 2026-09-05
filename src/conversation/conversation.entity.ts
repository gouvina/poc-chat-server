import { BaseEntity } from 'src/baseEntity/base.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

@Entity('conversations')
export class Conversation extends BaseEntity {

  @Column({type: 'varchar', length: 300})
  title!: string;
  
  @Column({ type: 'jsonb' })
  messages!: string[];
  
  @Column({ name: '_archived', default: false })
  _archived!: boolean;

  @ManyToOne(() => User, (user) => user.conversations, { onDelete: 'CASCADE'})
  user: User
}
