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
import { UserEntity } from './User';
import { WORK_TYPE } from './common/Worktype';
import { PostEntity } from './Post';
import { CommuteEntity } from './Commute';
import { RestReqEntity } from './restReq';

@Entity({name : 'company'})
export class CompanyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    company_name: string;

    @Column({ type: 'enum', enum: WORK_TYPE, nullable: false })
    work_type: WORK_TYPE;

    @Column({ nullable : false })
    coretime: number;

    @OneToMany(() => UserEntity, (user) => user.company)
    user: UserEntity[];

    @OneToMany(() => CommuteEntity, (commute) => commute.company)
    commute: CommuteEntity[];

    @OneToMany(() => PostEntity, (post) => post.company)
    post: PostEntity[];

    @OneToMany(() => RestReqEntity, (restReq) => restReq.company)
    restReq: RestReqEntity[];
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}