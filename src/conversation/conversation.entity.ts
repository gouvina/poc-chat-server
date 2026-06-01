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

  @ManyToOne(() => User, (user) => user.conversations, { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'userId'})
  user: User
  
  @Column({type: 'varchar', length: 300})
  title!: string;
  
  @OneToMany(() => Message, (message) => message.conversation, {cascade: true})
  messages: Message[]

  @Column({ name: '_archived', default: false })
  _archived!: boolean;
}
