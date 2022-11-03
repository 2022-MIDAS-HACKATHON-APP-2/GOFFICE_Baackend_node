import { Request as IRequest, Response as IResponse } from 'express';
import {
    Response,
    Request,
    Controller,
    Get,
    Delete,
    Put,
    Body,
} from '@decorators/express';
import { Injectable } from '@decorators/di';
import { AuthService } from '../services/auth';

@Controller('/auth')
@Injectable()
export class AuthController {
    constructor(private readonly authService: AuthService) {
        console.log('AuthController Attached!');
    }

}