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
    async createNewUser(@Request() req: any, @Response() res: any ) {
        const { email, password, company, department, position } = req.body;
        const companyId = await this.companyService.getCompanyId(company);
        const departmentId = await this.departmentService.getDepartmentId(company.id,department);
        const user = await this.authService.createAndGetUser(email, password, company.id, departmentId, position );
        const token = await access(user,0);
        return res.status(200).json({
            token: token
        })
    }

    @Post('/local')
    async loginUser(@Request() req: any, @Response() res: any ) {
        const { email, password } = req.body;
        const user = await this.authService.getUserByIdPw(email, password );
        const token = await access(user,0);
        return res.status(200).json({
            token: token
        })
    }

    @Post('/admin/new')
    async createNewAdmin(@Request() req: any, @Response() res: any ) {
        const { email, password, company, department, position } = req.body;
        const companyId = await this.companyService.getCompanyId(company);
        const departmentId = await this.departmentService.getDepartmentId(company.id,department);
        const admin = await this.authService.createAndGetAdmin(email, password, company.id, departmentId, position );
        const token = await access(admin,1);
        return res.status(200).json({
            token: token
        })
    }

    @Post('/admin/local')
    async loginAdmin(@Request() req: any, @Response() res: any ) {
        const { email, password } = req.body;
        const admin = await this.authService.getAdminByIdPw(email, password );
        const token = await access(admin,1);
        return res.status(200).json({
            token: token
        })
    }
}