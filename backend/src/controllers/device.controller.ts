import Koa from 'koa';
import Boom from 'boom';
import { getRepository } from 'typeorm';
import { Device } from '../entities';

export class DeviceController {

    createDevice = async (ctx: Koa.BaseContext) => {
        const {device} = ctx.request.body;
        const deviceRepository = getRepository(Device);

        deviceRepository.create(device);
        ctx.status = 200;
        ctx.body = {
            status: 200,
            message: 'ok'
        }
    }

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
        device.location = location || device.location;
        device.type = type || device.type;

        const updated = await device.save();

        ctx.status = 200;
        ctx.body = {
            statusCode: 200,
            message: 'Edited the item from devices',
            device: updated
        };
    }

    deleteDevice = async (ctx: Koa.BaseContext) => {
        const deviceRepository = getRepository(Device);

        const device = await deviceRepository.findOne(+ctx.params.id);
        if(!device)
            throw Boom.notFound('Device with given id not found');

        deviceRepository.delete(+ctx.params.id);

        ctx.status = 200;
        ctx.body = {
            statusCode: 200,
            message: 'Deleted the item from devices'
        };
    }
}