import Koa from "koa";

export function ErrorMiddleware(ctx: Koa.Context, next: () => Promise<any>) {
    return next().catch(err => {
        if(err.isBoom) {
            ctx.status = err.output.statusCode;
            ctx.body = err.output.payload
        } else {
            ctx.status = 500,
            ctx.body = {
                statusCode: 500,
                error: 'Internal Server Error',
                message: err.message || 'Internal Server Error'
            }
        }
    });
}