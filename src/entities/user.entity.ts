import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Conversation } from "./conversation.entity";
import { Query } from "./query.entity";

@Entity('users')
export class User extends BaseEntity {
    @Column({ type: 'varchar', length: 100, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 100 })
    password!: string;

    @OneToMany(() => Conversation, (conversation) => conversation.user)
    conversations?: Conversation[]

    @OneToMany(() => Query, (query) => query.user)
    queries?: Query[]
}
