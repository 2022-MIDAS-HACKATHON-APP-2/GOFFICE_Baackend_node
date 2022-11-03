import { Request, Response } from "express";
import { UserEntity } from "../entities/User";
import { getManager } from "typeorm";
import { CompanyEntity } from "../entities/Company";
import { POSITION } from "../entities/common/Position";
import { RestReqEntity } from "../entities/restReq";
import { STATE } from "../entities/common/State";


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

export async function deleteMember(req: Request, res: Response) {
    const memberRepository = getManager().getRepository(UserEntity);
    const manager = (<any>req).decoded;
    const memberId = Number(req.params.member_id);

    try{
        if(memberId==manager.id) return res.status(400).json({ message : "본인 삭제는 불가능"});
        checkManager(manager.position, res);
        const member = await memberRepository.findOne(
            { where: { company_id: manager.company_id, id: memberId }}
        );
        if(member) {
            memberRepository.delete({ id : memberId });
            return res.status(200).json({
                message: "회원 삭제 성공"
            });
        } else throw Error;
    } catch(err) {
        console.error(err);
        res.status(400).json({
            message: "회원 삭제 실패"
        })
    };
}

export async function veiwRestRes(req: Request, res: Response) {
    const restReqRepository = getManager().getRepository(RestReqEntity);
    const manager = (<any>req).decoded;

    try{
        const resting = restReqRepository.find({where: {company_id: manager.company_id}});
        res.status(200).json({
            resting
        });
    } catch(err) {
        console.error(err);
        res.status(400).json({
            message: "조회 실패"
        })
    }
}

export async function restRes(req: Request, res: Response) {
    const restReqRepository = getManager().getRepository(RestReqEntity);
    const manager = (<any>req).decoded;

    try{
        const resting = restReqRepository.update(
            { company_id: manager.company_id }, 
            { state: STATE.B }
        );
        res.status(200).json({
            message: "승인 성공",
            resting
        });
    } catch(err) {
        console.error(err);
        res.status(400).json({
            message: "승인 실패"
        })
    }
}export async function restResFail(req: Request, res: Response) {
    const restReqRepository = getManager().getRepository(RestReqEntity);
    const manager = (<any>req).decoded;

    try{
        const resting = restReqRepository.update(
            { company_id: manager.company_id }, 
            { state: STATE.C }
        );
        res.status(200).json({
            message: "거절 성공",
            resting
        });
    } catch(err) {
        console.error(err);
        res.status(400).json({
            message: "승인 실패"
        })
    }
}