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
    PrimaryColumn,
} from 'typeorm';
import { STATE } from './common/State';
import { CompanyEntity } from './Company';
import { PostEntity } from './Post';
import { UserEntity } from './User';

@Entity({name : 'restReq'})
export class RestReqEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    company_id: number;

    @Column()
    date: string;

    @Column({ nullable: false })
    reason: string;

    @Column({ type: 'enum', enum: STATE, nullable: false, default: STATE.A})
    state: STATE;

    @ManyToOne(() => UserEntity, (user) => user.comment)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => CompanyEntity, (company) => company.restReq)
    @JoinColumn({ name: 'company_id' })
    company: CompanyEntity;

    @CreateDateColumn()
    createdAt: Date;
}