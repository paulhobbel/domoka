import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Device} from "./Device";

@Entity({ name: 'schedules' })
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    beginTime: Date;

    @Column()
    endTime: Date;

    @OneToMany(type => Device, device => device.schedule)
    devices: Device[];
}