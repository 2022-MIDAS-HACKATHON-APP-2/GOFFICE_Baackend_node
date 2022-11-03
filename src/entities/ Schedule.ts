import { Injectable } from '@decorators/di';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
    PrimaryColumn,
    Timestamp,
} from 'typeorm';
import { UserEntity } from './User';

@Entity({name : 'schedule'})
export class ScheduleEntity{
    @PrimaryColumn()
    user_id: number;

    @PrimaryColumn()
    date: Date;

    @Column({ type: 'timestamp' })
    start_time: Timestamp; 

    @ManyToOne(() => UserEntity, (user) => user.schedule)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}