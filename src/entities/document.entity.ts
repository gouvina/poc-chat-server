import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Query } from "./query.entity";
import { Roll } from "./roll.entity";


@Entity('documents')
export class Document {
    @PrimaryColumn({ type: 'integer' })
    id!: number

    @Column({ type: 'integer' })
    page?: number

    @Column({ type: 'integer' })
    score?: number

    @Column({ type: 'varchar' })
    version?: string

    @Column({ type: 'varchar'})
    text?: string

    @ManyToOne(() => Roll, (roll) => roll.documents, {onDelete: 'CASCADE'})
    roll!: Roll

    @ManyToMany(() => Query, (query) => query.documents)
    @JoinTable()
    queries?: Query[]
}
