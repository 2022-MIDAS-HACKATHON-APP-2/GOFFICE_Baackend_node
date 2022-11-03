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
import { CompanyEntity } from './Company';
import { UserEntity } from './User';

@Entity({name : 'belong'})
export class BelongEntity {
    @PrimaryColumn()
    user_id: number;

    @PrimaryColumn()
    company_id: number;

    @ManyToOne(() => CompanyEntity, (company) => company.belong)
    @JoinColumn({ name : 'company_id'})
    company: CompanyEntity;

    @ManyToOne(() => UserEntity, (user) => user.belong)
    @JoinColumn({ name: 'user_id'})
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}