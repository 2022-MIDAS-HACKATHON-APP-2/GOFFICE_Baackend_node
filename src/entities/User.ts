import { Injectable } from '@decorators/di';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { ScheduleEntity } from './ Schedule';
import { BelongEntity } from './Belong';
import { POSITION } from './common/Position';
import { CommuteEntity } from './Commute';
import { CompanyEntity } from './Company';
import { PostEntity } from './Post';

@Entity({name : 'user'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false, unique: true })
    phone_number: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    password: string;

    @Column({ type: 'enum', enum: POSITION, nullable: false })
    position: POSITION;

    @Column({ nullable: false })
    company_id: number;

    @Column({ nullable: false })
    department: string;
    
    @ManyToOne(() => CompanyEntity, (company) => company.user)
    @JoinColumn({ name: 'company_id' })
    company: CompanyEntity;

    @OneToMany(() => BelongEntity, (belong) => belong.user)
    belong: BelongEntity[];

    @OneToMany(() => CommuteEntity, (commute) => commute.user)
    commute: CommuteEntity[];

    @OneToMany(() => PostEntity, (post) => post.user)
    post: PostEntity[];

    @OneToMany(() => ScheduleEntity, (schedule) => schedule.user)
    schedule: ScheduleEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}