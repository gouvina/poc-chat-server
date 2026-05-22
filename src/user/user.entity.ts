import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
    @PrimaryColumn({type: 'char', length: 36})
    id: string = uuidv4()

    @Column({type: 'varchar', length: 100})
    email!: string;

    @Column({type: 'varchar', length: 100})
    password!: string;
    
    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt!: Date;
}
