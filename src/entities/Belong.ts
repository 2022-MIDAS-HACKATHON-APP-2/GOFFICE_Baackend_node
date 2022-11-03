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
} from 'typeorm';
import { CompanyEntity } from './Company';
import { UserEntity } from './User';

@Entity('belong')
@Injectable()
export class BelongEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(
        (type) => CompanyEntity,
        (company) => company.id
    )
    company: number;

    @ManyToOne(
        (type) => UserEntity,
        (user) => user.id
    )
    user: number;

}