import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Documento } from "./documento.entity";

@Entity('rollos')
export class Rollo {
    @PrimaryColumn({ type: 'integer' })
    id!: number

    @Column({ type: 'varchar'})
    nombre?: string

    @Column({ type: 'integer'})
    cantidad_documentos!: number

    @OneToMany(() => Documento, (documento) => documento.rollo)
    documentos!: Documento[]
}