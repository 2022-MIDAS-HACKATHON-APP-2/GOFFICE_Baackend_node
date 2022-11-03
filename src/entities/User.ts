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
import { BelongEntity } from './Belong';
import { CompanyEntity } from './Company';
import { DepartmentEntity } from './Department';

@Entity('user')
@Injectable()
export class UserEntity {
    @PrimaryGeneratedColumn()
    @OneToMany(
        (type) => BelongEntity,
        (belong) => belong.user
    )
    id: number;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @ManyToOne(
        (type) => CompanyEntity,
        (company) => company.id
    )
    company: number;


    @ManyToOne(
        (type) => DepartmentEntity,
        (department) => department.id
    )
    department: number;

    @Column({ nullable: false })
    position: string;

}