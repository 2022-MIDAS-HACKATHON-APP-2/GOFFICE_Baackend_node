import { Inject, Injectable } from "@decorators/di";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/User";
import bcrypt from "bcrypt";
@Injectable()
export class AuthService {
    constructor(
        @Inject(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {}

    async createAndGetUser(email: string, password: string, company: number, department: number, position: string) {
        const newUser = await this.userRepository.findOne({where: {email}});
        if(newUser) {
            throw new Error('Already Registered');
        } else {
            const sealPass = await bcrypt.hash(password, 10);
            return await this.userRepository.save({email,sealPass,company,department,position});
        }
    }



    //async 
}