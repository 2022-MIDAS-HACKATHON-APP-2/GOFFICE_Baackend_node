import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

export default async (app: Express) => {
    if (process.env.NODE_ENV == 'production') {
        app.use(helmet());
    }
    app.use(morgan(process.env.NODE_ENV == 'production' ? 'combined' : 'dev'));
    app.use(
        cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            credentials: true,
            allowedHeaders: ['content-type','x-access-token']
        })
    );
    app.use(express.json({ limit: '16mb' }));
    app.use(
        express.urlencoded({
            extended: false,
        })
    );
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    app.get('/', (_req: Request, res: Response) => {
        res.status(200).json({ msg: 'hello'});
    });
}