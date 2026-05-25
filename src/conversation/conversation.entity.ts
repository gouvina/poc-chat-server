import { BaseEntity } from 'src/baseEntity/baseEntity.entity';
import { Message } from 'src/message/message.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('conversations')
export class Conversation extends BaseEntity {

  @Column({ type: 'char', length: 36})
  userId!: string;

  @ManyToOne(() => User, (user) => user.conversations, { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'userId'})
  user: User
  
  @Column({type: 'varchar', length: 300})
  title!: string;
  
  @OneToMany(() => Message, (message) => message.conversationId)
  messages: Message[]

  @Column({ name: '_archived', default: false })
  _archived!: boolean;
}
