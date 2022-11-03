import { Express } from 'express';
import envLoader from './env';

export default async ({ app }: { app: Express }) => {
    await envLoader();
};