import { CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';


export abstract class BaseEntity {
    @PrimaryColumn({type: 'char', length: 36})
    id: string = uuidv4()

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt!: Date;
}
