import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid", {name:"uuid"})
    uuid: string

    @Column({
        nullable:false
    })
    name: string;

    @Column({
        unique:true
    })
    email: string;

    @Column({
        nullable:false
    })
    password: string;


    @CreateDateColumn({
        nullable:false
    })
    createdOn: Date


    @UpdateDateColumn({
        nullable:false
    })
    updatedOn: Date



}
