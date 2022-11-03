import { Request, Response } from "express";
import { CommuteEntity } from "../entities/Commute";
import { getManager, Raw } from "typeorm";
import { UserEntity } from "../entities/User";

export async function goWork(req: Request, res: Response) {
    const commuteRepository = getManager().getRepository(CommuteEntity);
    const userRepo = getManager().getRepository(UserEntity);
    const user = (<any>req).decoded;
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const date = currentTime.getDate();
    const dateStr = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
    try {
        const getUser = await userRepo.findOne({where: {
            id: (<any>req).decoded.id
        }});
        
        // const commute = await commuteRepository.findOne({
        //     where: { user_id: (<any>req).decoded.id, Date(work_date) :  }
        // });
        const commute = await commuteRepository.findOne({
            where: { user_id: (<any>req).decoded.id, work_date : Raw(work_date => `DATE(${work_date})='${dateStr}'`)  }
        });


        //const commute = await commuteRepository.q
        if(!commute) {
            const newCom = commuteRepository.create({
                user_id: (<any>req).decoded.id,
                started_time: currentTime,
                company_id: getUser?.company_id,
                work_date: currentTime
            });
            await commuteRepository.save(newCom);
        } else {
            await commuteRepository.update(commute.id, { started_time: currentTime});
        }
        res.status(200).json({
            message: "출근시작"
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
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const date = currentTime.getDate();
    const dateStr = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
    try {
        const getUser = await userRepo.findOne({where: {
            id: (<any>req).decoded.id
        }});
        const commute = await commuteRepository.findOne({
            where: { user_id: (<any>req).decoded.id, work_date : Raw(work_date => `DATE(${work_date})='${dateStr}'`)  }
        });
        if(commute) {
            await commuteRepository.update({
                id: commute.id,
                user_id: getUser?.id
            }, { left_time: currentTime});
        } else throw Error('Not found');
        res.status(200).json({
            message: "success"
        })
        
    } catch(err) {
        console.error(err);
        res.status(500).json({
          message: err
        }); 
    }
    
}

export async function getTodayChulgunTime(req: Request, res: Response) {
    const commuteRepository = getManager().getRepository(CommuteEntity);
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const date = currentTime.getDate();
    const dateStr = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;

    const commute = await commuteRepository.findOne({
        where: { user_id: (<any>req).decoded.id, work_date : Raw(work_date => `DATE(${work_date})='${dateStr}'`)  }
    });

    try {
        if(commute) {
            res.status(200).json({
                time: commute.started_time
            })
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({
          message: err
        }); 
    }

}