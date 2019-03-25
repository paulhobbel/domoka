import Koa from 'koa';
import KoaBodyParser from 'koa-bodyparser';

import AppRouter from './routes';
import * as Database from './database';
import { ErrorMiddleware } from './middleware';

(async () => {
    await Database.connect();
    console.log('> Database connected');

    const app = new Koa();

    app.use(ErrorMiddleware);
    app.use(KoaBodyParser());
    app.use(AppRouter.routes());

    app.listen(3000, () => {
        console.log('> Server listening at port 3000');
    });
})();

process.on('unhandledRejection', err => {
    console.error(err);
})