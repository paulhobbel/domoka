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
    deviceId: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    location: string;

    @Column({ default: true })
    status: boolean;

    @ManyToOne(type => Schedule, schedule => schedule.devices, { nullable: true })
    schedule: Schedule;

    @Column({ nullable: true})
    watt: number;
}