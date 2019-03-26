import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import {Device} from "./Device";

@Entity({ name: 'power' })
export class Power extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    powerUsed: number;

    @Column()
    moneyCost: number;

    @Column()
    powerSavings: number;

    @Column()
    moneySavings: number;

    // @OneToMany(type => Device, device => device.schedule)
    // devices: Device[];
}