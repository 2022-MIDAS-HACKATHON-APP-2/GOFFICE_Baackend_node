import { Inject, Injectable } from "@decorators/di";
import { Admin, Repository } from "typeorm";
import { UserEntity } from "../entities/User";
import bcrypt from "bcrypt";
import { AdminEntity } from "../entities/Admin";
@Injectable()
export class AuthService {
    constructor(
        @Inject(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @Inject(AdminEntity) private readonly adminRepository: Repository<AdminEntity>
    ) {}

    async createAndGetUser(email: string, password2: string, company: number, department: number, position: string) {
        const newUser = await this.userRepository.findOne({where: {email}});
        if(newUser) {
            throw new Error('Already Registered');
        } else {
            const password = await bcrypt.hash(password2, 10);
            return await this.userRepository.save({email,password,company,department,position});
        }
    }

    async getUserByIdPw(email: string, rawPw: string) {
        const password = await bcrypt.hash(rawPw, 10);
        const user = await this.userRepository.findOne({where: {email}});
        if(!user || !await bcrypt.compare(rawPw, user.password)) {
            throw new Error('Not found User');
        }
        return user;
        
    }

    async createAndGetAdmin(email: string, password2: string, company: number, department: number, position: string) {
        const newAdmin = await this.adminRepository.findOne({where: {email}});
        if(newAdmin) {
            throw new Error('Already Registered');
        } else {
            const password = await bcrypt.hash(password2, 10);
            return await this.adminRepository.save({email,password,company,department,position});
        }
    }

    async getAdminByIdPw(email: string, rawPw: string) {
        const password = await bcrypt.hash(rawPw, 10);
        const admin = await this.adminRepository.findOne({where: {email}});
        if(!admin || !await bcrypt.compare(rawPw, admin.password)) {
            throw new Error('Not found Admin');
        }
        return admin;
    }

    

}