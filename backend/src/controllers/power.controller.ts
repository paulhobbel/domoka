import Koa from 'koa';
import Boom from 'boom';
import { getRepository } from 'typeorm';
import { Power } from '../entities/Power';

export class PowerController {

    getPower = async (ctx: Koa.BaseContext) => {
        const powerRepositiry = getRepository(Power);

        const power = await powerRepositiry.find();

        ctx.status = 200;
        ctx.body = {
            result: power
        }
    }

    resetPower = async (ctx: Koa.BaseContext) => {
        const powerRepositiry = getRepository(Power);
        const power = {
            "powerUsed": 0,
            "moneyCost": 0,
            "powerSavings": 0,
            "moneySavings": 0
        };

        powerRepositiry.clear();
        powerRepositiry.create(power);

        ctx.status = 200;
        ctx.body = {
            statusCode: 200,
            message: 'Reseted Power'
        };
    }
}