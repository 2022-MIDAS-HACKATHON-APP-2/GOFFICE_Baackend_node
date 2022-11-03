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
import { PostEntity } from './Post';
import { UserEntity } from './User';

@Entity({name : 'comment'})
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    post_id: number;

    @Column({ nullable: false })
    content: string;

    @ManyToOne(() => UserEntity, (user) => user.comment)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => PostEntity, (post) => post.comment)
    @JoinColumn({ name: 'post_id' })
    post: PostEntity;

    @CreateDateColumn()
    createdAt: Date;
}