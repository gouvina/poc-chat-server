import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Client-supplied identifier (POST/PUT body `id` in the legacy API). */
  @Column({ unique: true, name: 'client_id' })
  clientId: string;

  @Column()
  title: string;

  @Column({ type: 'jsonb' })
  messages: string[];

  @Column({ name: '_archived', default: false })
  _archived: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
