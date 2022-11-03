import { Inject, Injectable } from "@decorators/di";
import { Admin, Repository } from "typeorm";
import { UserEntity } from "../entities/User";
import { CommuteEntity } from "../entities/Commute";
import { AdminEntity } from "../entities/Admin";

@Injectable()
export class CommuteService {
    constructor(
        @Inject(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @Inject(CommuteEntity) private readonly commuteRepository: Repository<CommuteEntity>
    ) {}

    async recordStartedTime(user: number) {
        const work_date = new Date();
        //const getRecord = await this.commuteRepository.createQueryBuilder().select('commute.id').from(CommuteEntity, "commute").where('commute.user =: id', {id : user}).andWhere('commute.work_date =:date', {date: work_date}).getOne();
        const getRecord = await this.commuteRepository.findOne({where: {
            user: user,
            work_date: work_date
        }});
        const started_time = work_date;
        if(!getRecord) {
            const newCommuteRecord = await this.commuteRepository.save({user, work_date, started_time})
            return newCommuteRecord;
        } else {
            await this.commuteRepository.createQueryBuilder("commute").update().set({
                started_time: started_time
            }).where('commute.user =:id', {id : user}).andWhere('commute.work_date =:date', {date: work_date}).execute();
            //await this.commuteRepository.update()
        }
        
    }

    async recordLeaveTime(user: number) {
        const time = new Date();
        await this.commuteRepository.createQueryBuilder("commute").update().set({
            left_time: time
        }).where('commute.user =:id', {id : user}).andWhere('commute.work_date =:date', {date: time}).execute();
    }

    async recordStartScheduleTime(user: number, timestamp: number) {
        const willTime = new Date(timestamp * 1000)
        const work_date = new Date();
        const getRecord = await this.commuteRepository.createQueryBuilder()
            .select("id")
            .from(CommuteEntity, "commute")
            .where("commute.user =:user",{user:user}).andWhere("commute.work_date =:time", {time: work_date})
            .getOne();
        if(!getRecord) {
            await this.commuteRepository.createQueryBuilder('commute')
                .insert()
                .into(CommuteEntity)
                .values([
                    {user: user},
                    {work_date: work_date},
                    {start_schedule_time: willTime}
                ])
                .execute();
        } else {
            await this.commuteRepository.createQueryBuilder("commute").update().set({
                start_schedule_time: willTime
            }).where('commute.user =:id', {id : user}).andWhere('commute.work_date =:date', {date: work_date}).execute();
        }

    }
}