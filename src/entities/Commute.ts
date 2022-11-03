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
import { BelongEntity } from './Belong';
import { DepartmentEntity } from './Department';
import { UserEntity } from './User';
import { WORK_TYPE } from './common/Worktype';
import { AdminEntity } from './Admin';

@Entity('commute')
@Injectable()
export class CommuteEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        (type) => UserEntity,
        (user) => user.id
    )
    user: number;

    @Column({ type: 'timestamp' })
    work_date: Date | undefined;

    @Column({ type: 'timestamp' })
    started_time: Timestamp;

    @Column({ type: 'timestamp' })
    left_time: Timestamp;

    @Column({ type: 'timestamp' })
    working_time: Timestamp;

    @Column({ type: 'timestamp' })
    resting_time: Timestamp;



}