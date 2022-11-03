import { Request, Response } from "express";
import { UserEntity } from "../entities/User";
import { getManager } from "typeorm";
import { RestReqEntity } from "../entities/restReq";

export async function sendRestReq(req: Request, res: Response) {
    const restReqRepository = getManager().getRepository(RestReqEntity);
    const user = (<any>req).decoded;
    const { reason, date } = req.body;
    try{
        const rest = restReqRepository.findOne(date);
        if(await rest) throw Error;
        const restReq = restReqRepository.create({
            user_id : user.id,
            company_id: user.comment_id,
            reason,
            date
        });
        return res.status(202).json({
            message: "휴가 신청 성공"
        });
    } catch(err) {
        console.error(err);
        res.status(409).json({
            message: "이미 신청 됨"
        })
    }
};