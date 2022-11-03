import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { CompanyEntity } from "../entities/Company";
import { getManager } from "typeorm";

export async function AddCompany(req: Request, res: Response) {
  const companyRepository = getManager().getRepository(CompanyEntity);

  const { companyName, workType, coreTime } = req.body;;

  try{

    const company = await companyRepository.findOne({
      where: { company_name : companyName }
    });

    if(company) throw Error;
    else { 
        const newCompany = companyRepository.create({
            company_name: companyName,
            work_type: workType,
            coretime: coreTime
        });
        await companyRepository.save(newCompany);
        res.status(202).json({
            message: "회사 등록 성공"
        });
    }
  } catch(err) {
    console.error(err);
    res.status(409).json({
      message: "중복된 회사명"
    });
  }
}
