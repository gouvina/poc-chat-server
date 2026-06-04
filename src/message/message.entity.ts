import { BaseEntity } from "src/baseEntity/baseEntity.entity";
import { Conversation } from "src/conversation/conversation.entity";
import { SenderType } from "./enum/SenderType";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity('messages')
export class Message extends BaseEntity {

    @Column({type: 'varchar'})
    content!: string

    @Column({ type: 'varchar'})
    sender!: SenderType

    @ManyToOne(() => Conversation, (conversation) => conversation.messages, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'conversationId'})
    conversation: Conversation
}
