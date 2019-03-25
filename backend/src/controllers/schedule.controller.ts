import Koa from 'koa';
import Boom from 'boom';
import { getRepository } from 'typeorm';
import { Schedule } from '../entities/Schedule';

export class DeviceController {
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