import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        nullable: false
    })
    username: string;

    @Column({
        nullable: false
    })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}