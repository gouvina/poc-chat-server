
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity('conversations')
export class Conversation extends BaseEntity {
  
  @Column({type: 'varchar', length: 300})
  title!: string;
  
  @OneToMany(() => Message, (message) => message.conversation, {cascade: true})
  messages!: Message[]
  
  @Column({ name: '_archived', default: false })
  _archived!: boolean;

  @ManyToOne(() => User, (user) => user.conversations, { onDelete: 'CASCADE'})
  user!: User
}
