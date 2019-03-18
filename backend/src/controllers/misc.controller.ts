import Koa from 'koa';
import os from 'os';

export class MiscController {
    getStatus = (ctx: Koa.BaseContext) => {
        ctx.status = 200;
        ctx.body = {
            name: 'domoca-api',
            hostname: os.hostname(),
            uptime: process.uptime() | 0,

        }
    }
}