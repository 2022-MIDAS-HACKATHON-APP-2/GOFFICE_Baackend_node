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
import { UserEntity } from './User';
import { WORK_TYPE } from './common/Worktype';
import { PostEntity } from './Post';
import { CommuteEntity } from './Commute';

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

    @OneToMany(() => BelongEntity, (belong) => belong.company)
    belong: BelongEntity[];

    @OneToMany(() => CommuteEntity, (commute) => commute.company)
    commute: CommuteEntity[];

    @OneToMany(() => PostEntity, (post) => post.company)
    post: PostEntity[];
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}