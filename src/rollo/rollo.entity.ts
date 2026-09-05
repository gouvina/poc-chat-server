import { Documento } from "src/documento/documento.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

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