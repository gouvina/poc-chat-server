import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Document } from "./document.entity";

@Entity('rolls')
export class Roll {
    @PrimaryColumn({ type: 'integer' })
    id!: number

    @Column({ type: 'varchar'})
    name?: string

    @Column({ type: 'integer'})
    number_documents!: number

    @OneToMany(() => Document, (document) => document.roll)
    documents!: Document[]
}