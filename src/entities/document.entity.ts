import { Roll } from "src/models/roll/roll.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Query } from "./query.entity";


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
    @JoinColumn({ name: 'rollId'})
    roll!: Roll

    @ManyToMany(() => Query, (query) => query.documents)
    queries?: Query[]
}