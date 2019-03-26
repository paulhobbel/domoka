import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Device} from "./Device";

@Entity({ name: 'power' })
export class Power {
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