import { Inject, Injectable } from "@decorators/di";
import { Repository } from "typeorm";
import { WORK_TYPE } from "../entities/common/Worktype";
import { CompanyEntity } from "../entities/Company";

@Injectable()
export class CompanyService {
    constructor(
        @Inject(CompanyEntity) private readonly companyEntity: Repository<CompanyEntity>
    ) {}

    async getCompanyId(companyName: string) {
        const company = await this.companyEntity.createQueryBuilder("company")
            .select("company.id")
            .where("company.company_name =:name", {name: companyName})
            .getOne()
        return company;
    }

    async AddCompany(companyName: string, workType: WORK_TYPE) {
        return await this.companyEntity.createQueryBuilder("company")
            .insert()
            .into(CompanyEntity)
            .values([
                { company_name: companyName },
                { work_type: workType}
            ])
            .execute();
    }
    
}