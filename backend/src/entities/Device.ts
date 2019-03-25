import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum DeviceType {
    Switch = 'switch',
    Sensor = 'sensor'
}

@Entity({ name: 'devices' })
export class Device {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    location: string;

    @Column()
    type: DeviceType;
}