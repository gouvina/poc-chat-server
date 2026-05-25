import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';


@Entity('messages')
export class Message {
    @PrimaryColumn({type: 'char', length: 36})
    id: string = uuidv4()

    @Column({type: 'varchar'})
    content!: string

    @Column({ type: 'varchar'})
    sender!: string

}