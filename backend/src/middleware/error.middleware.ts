import Koa from "koa";
import { STATUS_CODES } from "http";

export function ErrorMiddleware(ctx: Koa.Context, next: () => Promise<any>) {
    return next().catch(err => {
        if(err.isBoom) {
            ctx.status = err.output.statusCode;
            ctx.body = err.output.payload
        } else {
            console.log(err);
            ctx.status = err.status || 500,
            ctx.body = {
                statusCode: err.status,
                error: STATUS_CODES[err.status || 500],
                message: err.message || 'Internal Server Error'
            }
        }
    });
}