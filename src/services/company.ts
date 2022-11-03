import { Inject, Injectable } from "@decorators/di";
import { Repository } from "typeorm";
import { CompanyEntity } from "../entities/Company";

@Injectable()
export class CompanyService {
    constructor(
        @Inject(CompanyEntity) private readonly companyEntity: Repository<CompanyEntity>
    ) {}

    async getCompanyId(companyName: string) {
        const company = await this.companyEntity.createQueryBuilder("company").where("company.company_name =:name", {name: companyName}).getOne()
        if(!company) return -1;
        return company.id;
    }
    
}