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
import { FILED } from './common/Filed';
import { CompanyEntity } from './Company';
import { UserEntity } from './User';

@Entity({name : 'post'})
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25, nullable: false })
    title: string;

    @Column({ length: 255, nullable: false })
    content: string;

    @Column({ type: 'enum', enum: FILED, nullable: false })
    field: FILED;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: false })
    user_id: number;

    @Column({ nullable: false })
    company_id: number;

    @ManyToOne(() => UserEntity, (user) => user.post)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => CompanyEntity, (company) => company.post)
    @JoinColumn({ name: 'company_id' })
    company: CompanyEntity;
}