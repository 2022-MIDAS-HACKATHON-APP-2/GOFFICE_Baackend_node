import { Express } from 'express';
import "reflect-metadata";
import envLoader from './env';
import databaseLoader from './db';
import expressLoader from './express';
import routeLoader from './route';

export default async ({ app }: { app: Express }) => {
    await envLoader();
    await databaseLoader();
    await expressLoader(app);
    await routeLoader(app);
};