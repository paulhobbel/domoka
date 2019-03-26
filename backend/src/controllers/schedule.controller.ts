import Koa from 'koa';
import Boom from 'boom';
import { getRepository } from 'typeorm';
import { Schedule } from '../entities/Schedule';

export class ScheduleController {

    getSchedules = async (ctx: Koa.BaseContext) => {
        const scheduleRepositiry = getRepository(Schedule);

        const schedules = await scheduleRepositiry.find();

        ctx.status = 200;
        ctx.body = {
            count: schedules.length,
            result: schedules
        }
    }

    getSchedule = async (ctx: Koa.BaseContext) => {
        const scheduleRepositiry = getRepository(Schedule);

        const schedule = await scheduleRepositiry.findOne(+ctx.params.id);
        if(!schedule)
            throw Boom.notFound('Device with given id not found');

        ctx.status = 200;
        ctx.body = schedule;
    }

    createSchedule = async (ctx: Koa.BaseContext) => {
        const { name, description, devices, beginTime, endTime } = ctx.request.body;
        const scheduleRepository = getRepository(Schedule);

        const created = await scheduleRepository
            .create({ name, description, devices, beginTime, endTime })
            .save();
        
        ctx.status = 200;
        ctx.body = {
            status: 200,
            message: 'Schedule created successfully',
            schedule: created
        }
    }

    editSchedule = async (ctx: Koa.BaseContext) => {
        const { name, description, beginTime, endTime, devices } = ctx.request.body;
        const scheduleRepositiry = getRepository(Schedule);

        let schedule = await scheduleRepositiry.findOne(+ctx.params.id);
        if(!schedule)
            throw Boom.notFound('Device with given id not found');

        schedule.name = name || schedule.name;
        schedule.description = description || schedule.description;
        schedule.beginTime = beginTime || schedule.beginTime;
        schedule.endTime = endTime || schedule.endTime;
        schedule.devices = devices || schedule.devices;

        await scheduleRepositiry.update(schedule.id, schedule);

        ctx.status = 200;
        ctx.body = {
            statusCode: 200,
            message: 'Edited the item from schedules'
        };
    }

    deleteSchedule = async (ctx: Koa.BaseContext) => {
        const scheduleRepositiry = getRepository(Schedule);

        const schedule = await scheduleRepositiry.findOne(+ctx.params.id);
        if(!schedule)
            throw Boom.notFound('Device with given id not found');

        scheduleRepositiry.delete(+ctx.params.id);
        scheduleRepositiry
        ctx.status = 200;
        ctx.body = {
            statusCode: 200,
            message: 'Deleted the item from schedules'
        };
    }
}