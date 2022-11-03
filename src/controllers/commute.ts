import { Request, Response } from "express";
import { CommuteEntity } from "../entities/Commute";
import { getManager } from "typeorm";

export async function goWork(req: Request, res: Response) {
    const commuteRepository = getManager().getRepository(CommuteEntity);
    // const currentTime = new Date();
    // try {
    //     const commute = await commuteRepository.findOne({
    //         where: { user: req.decoded.id }
    //     })
    // }
}