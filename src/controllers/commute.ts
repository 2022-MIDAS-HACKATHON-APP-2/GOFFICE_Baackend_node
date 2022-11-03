import { Request, Response } from "express";
import { CommuteEntity } from "../entities/Commute";
import { getManager } from "typeorm";
import { UserEntity } from "../entities/User";

export async function goWork(req: Request, res: Response) {
    const commuteRepository = getManager().getRepository(CommuteEntity);
    const userRepo = getManager().getRepository(UserEntity);
    const currentTime = new Date();
    try {
        const getUser = await userRepo.findOne({where: {
            id: (<any>req).decoded.id
        }});
        
        const commute = await commuteRepository.findOne({
            where: { user_id: (<any>req).decoded.id, work_date : currentTime }
        });
        if(!commute) {
            const newCom = commuteRepository.create({
                user_id: (<any>req).decoded.id,
                started_time: currentTime,
                company_id: getUser?.company_id
            });
            await commuteRepository.save(newCom);
        } else {
            await commuteRepository.update(commute.id, { started_time: currentTime});
        }
        res.status(200).json({
            message: "출근"
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
          message: err
        }); 
    }
}

export async function exitWork(req: Request, res: Response) {
    const commuteRepository = getManager().getRepository(CommuteEntity);
    const userRepo = getManager().getRepository(UserEntity);
    const currentTime = new Date();
    try {
        const getUser = await userRepo.findOne({where: {
            id: (<any>req).decoded.id
        }});
        const commute = await commuteRepository.findOne({
            where: { user_id: (<any>req).decoded.id, work_date : currentTime }
        });
        if(commute) {
            await commuteRepository.update(commute.id, { started_time: currentTime});
        } else throw Error('Not found');
        
    } catch(err) {
        console.error(err);
        res.status(500).json({
          message: err
        }); 
    }
    
}