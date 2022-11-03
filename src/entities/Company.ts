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
import { DepartmentEntity } from './Department';
import { UserEntity } from './User';

@Entity('company')
@Injectable()
export class CompanyEntity {
    
    @PrimaryGeneratedColumn()
    @OneToMany(
        (type) => UserEntity,
        (user) => user.company
    )
    @OneToMany(
        (type) => DepartmentEntity,
        (department) => department.company
    )
    @OneToMany(
        (type) => BelongEntity,
        (belong) => belong.company
    )
    id: number;

    @Column({ nullable: false })
    company_name: string;

}