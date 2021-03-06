import Koa from 'koa';
import Boom from 'boom';
import { getRepository } from 'typeorm';
import { Schedule } from '../entities/Schedule';

export class ScheduleController {

    getSchedules = async (ctx: Koa.BaseContext) => {
        const scheduleRepositiry = getRepository(Schedule);

        const schedules = await scheduleRepositiry.find({ relations: ['devices'] });

        ctx.status = 200;
        ctx.body = {
            count: schedules.length,
            result: schedules
        }
    }

    getSchedule = async (ctx: Koa.BaseContext) => {
        const scheduleRepositiry = getRepository(Schedule);

        const schedule = await scheduleRepositiry.findOne(+ctx.params.id, { relations: ['devices'] });
        if(!schedule)
            throw Boom.notFound('Device with given id not found');

        ctx.status = 200;
        ctx.body = schedule;
    }

    createSchedule = async (ctx: Koa.BaseContext) => {
        const { name, description, devices, beginTime, endTime } = ctx.request.body;
        const scheduleRepository = getRepository(Schedule);

        const created = await scheduleRepository
            .create({ name, description, devices: devices.map((id: number) => ({ id })), beginTime, endTime })
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

        let schedule = await scheduleRepositiry.findOne(+ctx.params.id, { relations: ['devices'] });
        if(!schedule)
            throw Boom.notFound('Schedule with given id not found');

        schedule.name = name || schedule.name;
        schedule.description = description || schedule.description;
        schedule.beginTime = beginTime || schedule.beginTime;
        schedule.endTime = endTime || schedule.endTime;
        schedule.devices = devices ? devices.map((id: number) => ({ id })) : schedule.devices;

        const updated = await schedule.save();

        ctx.status = 200;
        ctx.body = {
            statusCode: 200,
            message: 'Edited the item from schedules',
            schedule: updated
        };
    }

    toggleSchedule = async (ctx: Koa.BaseContext) => {
        const scheduleRepositiry = getRepository(Schedule)

        let schedule = await scheduleRepositiry.findOne(+ctx.params.id);

        if(!schedule)
            throw Boom.notFound('Schedule with given id not found');

        schedule.status = !schedule.status;

        const updated = await schedule.save();

        ctx.body = {
            statusCode: 200,
            message: 'Toggeled the item from schedules',
            schedule: updated
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