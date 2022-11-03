import { Request as IRequest, Response as IResponse } from 'express';
import {
    Response,
    Request,
    Controller,
    Get,
    Delete,
    Put,
    Body,
    Post,
} from '@decorators/express';
import { Injectable } from '@decorators/di';
import { AuthService } from '../services/auth';
import { CompanyService } from '../services/company';
import { DepartmentService } from '../services/department';
import { access } from '../utils/jwt';

@Controller('/auth')
@Injectable()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly companyService: CompanyService,
        private readonly departmentService: DepartmentService
        ) {
        console.log('AuthController Attached!');
    }

    @Post('/new')
    async createNewUser(@Request() req: any, @Response() res: IResponse ) {
        const { email, password, company, department, position } = req.body;
        const companyId = await this.companyService.getCompanyId(company);
        const departmentId = await this.departmentService.getDepartmentId(companyId,department);
        const user = await this.authService.createAndGetUser(email, password, companyId, departmentId, position );
        const token = await access(user);
        return res.status(200).json({
            token: token
        })
    }

    @Post('/local')
    async login(@Request() req: any, @Response() res: IResponse ) {
        const { email, password } = req.body;
        const user = await this.authService.getUserByIdPw(email, password );
        const token = await access(user);
        return res.status(200).json({
            token: token
        })
    }

}