import { createConnection } from 'typeorm';

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
            //UserEntity,
        ],
        migrations: [],
        subscribers: [],
    })
        .then((connection) => {
            // Container.provide([
                // {
                //     provide: UserEntity,
                //     useValue: connection.getRepository(UserEntity),
                // },
            // ]);
            console.log('Database Connected!');
        })
        .catch((error) => console.error(error));
};