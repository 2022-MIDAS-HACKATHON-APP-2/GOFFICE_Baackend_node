import { Injectable } from "@decorators/di";
import { Controller, Post, Request, Response } from "@decorators/express";
import { CompanyService } from "../services/company";


@Controller('/company')
@Injectable()
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService
    ) {}

    @Post('/new')
    async AddNewCompany(
        @Request() req: any,
        @Response() res: any
    ) { 
        const { companyName, workType } = req.body;
        const company = await this.companyService.getCompanyId(companyName);
        console.log(company);
        if(!company) {
            await this.companyService.AddCompany(companyName, workType);
            return res.status(202).json({
                message: "회사 등록 성공"
            });
        } else return res.status(409).json({
            message: "이미 등록된 회사"
        })
    }

}
