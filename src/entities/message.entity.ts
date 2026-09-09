import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { SenderType } from "src/models/message/enum/sender-type.enum";
import { Conversation } from "./conversation.entity";


@Entity('messages')
export class Message extends BaseEntity {

    @Column({type: 'varchar'})
    content!: string

    @Column({ type: 'varchar'})
    sender!: SenderType

    @ManyToOne(() => Conversation, (conversation) => conversation.messages, {onDelete: 'CASCADE'})
    conversation!: Conversation
}
