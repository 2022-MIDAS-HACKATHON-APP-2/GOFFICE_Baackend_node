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
    Timestamp,
} from 'typeorm';
import { UserEntity } from './User';
import { WORK_TYPE } from './common/Worktype';
import { CompanyEntity } from './Company';

@Entity({name : 'commute'})
export class CommuteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    company_id: number;

    @Column({ type: 'timestamp' })
    work_date: Timestamp;

    @Column({ type: 'timestamp' })
    started_time: Timestamp;

    @Column({ type: 'timestamp' })
    left_time: Timestamp;

    @Column({ type: 'timestamp' })
    working_time: Timestamp;

    @Column({ type: 'timestamp' })
    resting_time: Timestamp;

    @ManyToOne(() => UserEntity, (user) => user.commute)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => CompanyEntity, (company) => company.commute)
    @JoinColumn({ name: 'company_id' })
    company: CommuteEntity;
}