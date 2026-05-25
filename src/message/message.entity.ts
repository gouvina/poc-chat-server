import { BaseEntity } from "src/baseEntity/baseEntity.entity";
import { Conversation } from "src/conversation/conversation.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity('messages')
export class Message extends BaseEntity {

    @Column({type: 'varchar'})
    content!: string

    @Column({ type: 'varchar'})
    sender!: string

    @Column({type: 'char', length: 36})
    conversationId!: string;

    @ManyToOne(() => Conversation, (conversation) => conversation.messages, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'conversationId'})
    conversation: Conversation
}