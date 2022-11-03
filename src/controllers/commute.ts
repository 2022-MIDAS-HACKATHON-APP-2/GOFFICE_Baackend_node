import { Request as IRequest, Response as IResponse } from 'express';
import {
    Response,
    Request,
    Controller,
    Get,
    Delete,
    Put,
    Body,
    Post,
} from '@decorators/express';
import { Injectable } from '@decorators/di';
import { CompanyService } from '../services/company';
import { DepartmentService } from '../services/department';
import { access } from '../utils/jwt';
import { CommuteService } from '../services/commute';
import { authMiddleware } from '../middlewares/auth';

@Controller('/commute')
@Injectable()
export class CommuteController {
    constructor(
        private readonly commuteService: CommuteService
    ) {}

    @Post('/start', [authMiddleware as any])
    async startCommute(@Request() req: any, @Response() res: any) {
        const newData = await this.commuteService.recordStartedTime(req.decoded.id)
        return res.status(200).json({
            result : true
        });
    }

    @Post('/leave', [authMiddleware as any])
    async stopWork(@Request() req: any, @Response() res: any) {
        await this.commuteService.recordLeaveTime(req.decoded.id)
        return res.status(200).json({
            result: true
        });
    }

    @Post('/startSchedule', [authMiddleware as any])
    async recordStartSchedule(@Request() req: any, @Response() res: any) {
        const { time } = req.body;
        await this.commuteService.recordStartScheduleTime(req.decoded.id,time)
        return res.status(200).json({
            result : true
        });
    }
}