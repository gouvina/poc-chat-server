import { Roll } from "src/roll/roll.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";


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
