import { BaseEntity } from "src/baseEntity/baseEntity.entity";
import { Conversation } from "src/conversation/conversation.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @Column({ type: 'varchar', length: 100, unique: true })
    username!: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 100 })
    password!: string;

    @OneToMany(() => Conversation, (conversation) => conversation.user)
    conversations: Conversation[]
}
