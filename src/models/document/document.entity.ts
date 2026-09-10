import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm"
import { Roll } from "../roll/roll.entity"

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

    @Column({ type: 'varchar' })
    text?: string

    @ManyToOne(() => Roll, (roll) => roll.documents, {onDelete: 'CASCADE'})
    roll!: Roll
}
