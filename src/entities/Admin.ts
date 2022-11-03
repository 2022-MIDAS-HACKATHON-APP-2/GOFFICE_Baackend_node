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
} from 'typeorm';
import { CompanyEntity } from './Company';


@Entity({name : 'admin'})
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    company_id: number;

    @ManyToOne(() => CompanyEntity, (company) => company.id)
    @JoinColumn({ name : 'company_id'})
    company: CompanyEntity;
}