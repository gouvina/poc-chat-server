import { BaseEntity } from 'src/baseEntity/baseEntity.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column({ type: 'jsonb' })
  messages!: string[];

  @Column({ name: '_archived', default: false })
  _archived!: boolean;
}
