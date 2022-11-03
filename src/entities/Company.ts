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
import { WORK_TYPE } from './common/Worktype';
import { AdminEntity } from './Admin';

@Entity('company')
@Injectable()
export class CompanyEntity {
    
    @PrimaryGeneratedColumn()
    @OneToMany(
        (type) => UserEntity,
        (user) => user.company
    )
    @OneToMany(
        (type) => AdminEntity,
        (admin) => admin.company
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

    @Column({ type: 'enum', name: 'work_type', enum: WORK_TYPE })
    work_type: WORK_TYPE;

}