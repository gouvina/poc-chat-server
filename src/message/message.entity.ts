import { BaseEntity } from "src/baseEntity/base.entity";
import { SenderType } from "./enum/sender-type.enum";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Conversation } from "src/conversation/conversation.entity";


@Entity('messages')
export class Message extends BaseEntity {

    @Column({type: 'varchar'})
    content!: string

    @Column({ type: 'varchar'})
    sender!: SenderType

    @ManyToOne(() => Conversation, (conversation) => conversation.messages, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'conversationId'})
    conversation!: Conversation
}
