import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import {Schedule} from "./Schedule";

export enum DeviceType {
    Switch = 'switch',
    Sensor = 'sensor'
}

@Entity({ name: 'devices' })
export class Device extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    location: string;

    @ManyToOne(type => Schedule, schedule => schedule.devices, { nullable: true })
    schedule: Schedule;

    @Column()
    type: DeviceType;

    @Column({ nullable: true})
    watt: number;

    @Column({ default: false })
    status: boolean;
}