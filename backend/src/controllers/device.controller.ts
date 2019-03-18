import Koa from 'koa';
import Boom from 'boom';
import { getRepository } from 'typeorm';
import { Device } from '../entities';

export class DeviceController {
    getDevices = async (ctx: Koa.BaseContext) => {
        const deviceRepository = getRepository(Device);

        const devices = await deviceRepository.find();

        ctx.status = 200;
        ctx.body = {
            count: devices.length,
            result: devices
        }
    }

    getDevice = async (ctx: Koa.BaseContext) => {
        const deviceRepository = getRepository(Device);

        const device = await deviceRepository.findOne(+ctx.params.id);
        if(!device)
            throw Boom.notFound('Device with given id not found');

        ctx.status = 200;
        ctx.body = device;
    }
}