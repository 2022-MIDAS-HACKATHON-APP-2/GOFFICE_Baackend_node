import express from 'express';
import { attachControllers } from '@decorators/express';
import { AuthController } from '../controllers/auth';
import { CompanyController } from '../controllers/company';

export default async (app: express.Application) => {
    attachControllers(app, [AuthController]);
    attachControllers(app, [CompanyController]);
       
}