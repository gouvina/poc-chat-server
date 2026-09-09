import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Rollo } from "./rollo.entity";


@Entity('documentos')
export class Documento {
    @PrimaryColumn({ type: 'integer' })
    id!: number

    @Column({ type: 'integer' })
    hoja?: number

    @Column({ type: 'integer' })
    calificacion?: number

    @Column({ type: 'varchar' })
    version?: string

    @Column({ type: 'varchar'})
    texto?: string

    @ManyToOne(() => Rollo, (rollo) => rollo.documentos, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'rolloId'})
    rollo!: Rollo
}