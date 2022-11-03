import { Inject, Injectable } from "@decorators/di";
import { Repository } from "typeorm";
import { DepartmentEntity } from "../entities/Department";

@Injectable()
export class DepartmentService {
    constructor(
        @Inject(DepartmentEntity) private readonly departmentEntity: Repository<DepartmentEntity>
    ) {}

    async getDepartmentId(companyId: number, departmentName: string) {
        const department = await this.departmentEntity.createQueryBuilder("department").where("department.department =:name", {name: departmentName}).where("department.company =:id", {id: companyId}).getOne();
        if(!department) return -1;
        return department.id;
    }
    
}