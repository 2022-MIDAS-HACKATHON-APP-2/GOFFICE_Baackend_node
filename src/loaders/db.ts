import { Container } from '@decorators/di';
import { createConnection } from 'typeorm';
import { AdminEntity } from '../entities/Admin';
import { BelongEntity } from '../entities/Belong';
import { CommuteEntity } from '../entities/Commute';
import { CompanyEntity } from '../entities/Company';
import { DepartmentEntity } from '../entities/Department';
import { UserEntity } from '../entities/User';

export default async () => {
    await createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: process.env.DB_LOGGING === 'true',
        entities: [
            UserEntity,
            DepartmentEntity,
            CompanyEntity,
            BelongEntity,
            AdminEntity,
            CommuteEntity
        ],
        migrations: [],
        subscribers: [],
    })
        .then((connection) => {
            Container.provide([
                {
                    provide: UserEntity,
                    useValue: connection.getRepository(UserEntity),
                },
                {
                    provide: DepartmentEntity,
                    useValue: connection.getRepository(DepartmentEntity),
                },
                {
                    provide: CompanyEntity,
                    useValue: connection.getRepository(CompanyEntity),
                },
                {
                    provide: BelongEntity,
                    useValue: connection.getRepository(BelongEntity),
                },
                {
                    provide: AdminEntity,
                    useValue: connection.getRepository(AdminEntity),
                },
                {
                    provide: CommuteEntity,
                    useValue: connection.getRepository(CommuteEntity),
                },
            ]);
            console.log('Database Connected!');
        })
        .catch((error) => console.error(error));
};