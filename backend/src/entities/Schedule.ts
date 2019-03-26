import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, ManyToMany, JoinTable } from "typeorm";
import {Device} from "./Device";

@Entity({ name: 'schedules' })
export class Schedule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({type: 'time'})
    beginTime: string;

    @Column({type: 'time'})
    endTime: string;

    @Column({ default: true })
    status: boolean;

    @ManyToMany(type => Device)
    @JoinTable()
    devices: Device[];
}