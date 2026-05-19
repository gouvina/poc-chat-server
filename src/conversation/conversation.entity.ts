import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('conversations')
export class Conversation {
  @PrimaryColumn({ type: 'char', length: 36})
  id: string = uuidv4()

  @Column({type: 'varchar', length: 300})
  title!: string;

  @Column({ type: 'jsonb' })
  messages!: string[];

  @Column({ name: '_archived', default: false })
  _archived!: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone'	})
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone'})
  updatedAt!: Date;
}
