/* Goffice Backend Application */

import express from 'express';
import dotenv from 'dotenv';
import loaders from './loaders';

async function bootstrap() {
    const app = express();
    dotenv.config();
    await loaders({ app });
    app.listen(process.env.PORT , () => {
        console.log(`Server is running port ${process.env.PORT}`);
    });
}

bootstrap();