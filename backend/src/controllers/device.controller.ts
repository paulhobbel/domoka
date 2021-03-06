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

    createDevice = async (ctx: Koa.BaseContext) => {
        const { deviceId, name, location, watt } = ctx.request.body;
        const deviceRepository = getRepository(Device);

        if(!name || !location)
            throw Boom.badRequest();

        const device = await deviceRepository.create({ deviceId, name, location, watt }).save();

        ctx.status = 200;
        ctx.body = {
            status: 200,
            message: 'Device was successfully added',
            device
        }
    }

    editDevice = async (ctx: Koa.BaseContext) => {
        const { deviceId, name, location, watt } = ctx.request.body;
        const deviceRepository = getRepository(Device);

        let device = await deviceRepository.findOne(+ctx.params.id);
        if(!device)
            throw Boom.notFound('Device with given id not found');

        device.deviceId = deviceId || device.deviceId;
        device.name = name || device.name;
        device.location = location || device.location;
        device.watt = watt || device.watt;

        const updated = await device.save();

        ctx.status = 200;
        ctx.body = {
            statusCode: 200,
            message: 'Edited the item from devices',
            device: updated
        };
    }
    
    toggleDevice = async (ctx: Koa.BaseContext) => {
        const deviceRepository = getRepository(Device)

        let device = await deviceRepository.findOne(+ctx.params.id);

        if(!device)
            throw Boom.notFound('Device with given id not found');

        device.status = !device.status;

        const updated = await device.save();

        ctx.body = {
            statusCode: 200,
            message: 'Toggeled the item from devices',
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