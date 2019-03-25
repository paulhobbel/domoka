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

    editDevice = async (ctx: Koa.BaseContext) => {
        const { name, description, location, type } = ctx.request.body;
        const deviceRepository = getRepository(Device);

        let device = await deviceRepository.findOne(+ctx.params.id);
        if(!device)
            throw Boom.notFound('Device with given id not found');

        device.name = name || device.name;
        device.description = description || device.description;
        device.location || location || device.location;
        device.type = type || device.type;

        await deviceRepository.update(device.id, device);

        ctx.status = 200;

    }
}