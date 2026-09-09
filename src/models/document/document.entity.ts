import { Roll } from "src/entities/roll.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";


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
}
