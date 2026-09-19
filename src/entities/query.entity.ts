import { Entity, Column, ManyToOne, ManyToMany } from "typeorm"
import { User } from "./user.entity"
import { Document } from "./document.entity"
import { BaseEntity } from "./base.entity"

@Entity('queries')
export class Query extends BaseEntity {
    @Column({ type: 'varchar' })
    question!: string

    @Column()
    keywords!: string[]

    @Column({ type: 'varchar' })
    answer!: string

    @ManyToOne(() => User, (user) => user.queries, { onDelete: 'CASCADE' })
    user!: User

    @ManyToMany(() => Document, (document) => document.queries)
    documents?: Document[]
}
