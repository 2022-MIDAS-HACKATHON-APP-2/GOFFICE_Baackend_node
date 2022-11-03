import { Request, Response } from "express";
import { UserEntity } from "../entities/User";
import { getManager } from "typeorm";
import { CompanyEntity } from "../entities/Company";
import { POSITION } from "../entities/common/Position";


async function checkManager(position: string, res: Response) {
    if(position !== POSITION.B) {
        return res.status(403).json({
            message: "관리자 권한 없음"
        })
    }
};

export async function viewMember(req: Request, res: Response) {
    const memberRepository = getManager().getRepository(UserEntity);
    const manager = (<any>req).decoded;

    try{
        checkManager(manager.position, res);
        const members = await memberRepository.find(
            { where : { company_id: manager.company_id, position: POSITION.A }}
        );
        const counting = await memberRepository.count(
            { where : { company_id: manager.company_id, position: POSITION.A }}
        );
        res.status(200).json({
            message: counting + "명",
            members,
        });
    } catch(err) {
        console.error(err);
        res.status(404).json({
            message: "찾을 수 없음"
        });
    }
};

export async function fixMember(req: Request, res: Response) {
    const memberRepository = getManager().getRepository(UserEntity);
    const manager = (<any>req).decoded;
    const memberId = Number(req.params.member_id);
    const { memberName, memberPosition, department } = req.body;

    try{
        
        const member = await memberRepository.update({
            id: memberId,
            company_id: manager.company_id
        }, {
            name: memberName,
            position: memberPosition,
            department
        });

        res.status(200).json({
            message: "수정 성공",
            member
        });
    } catch(err) {
        console.error(err);
        res.status(404).json({
            message: "찾을 수 없음"
        });
    }
};

export async function viewOneMember(req: Request, res: Response) {
    const memberRepository = getManager().getRepository(UserEntity);
    const manager = (<any>req).decoded;
    const memberId = Number(req.params.member_id);

    try{
        checkManager(manager.position, res);
        const member = await memberRepository.findOne(
            { where : { company_id: manager.company_id, position: POSITION.A, id: memberId }}
        );
        res.status(200).json({
            member
        });
    } catch(err) {
        console.error(err);
        res.status(404).json({
            message: "찾을 수 없음"
        });
    }
};

