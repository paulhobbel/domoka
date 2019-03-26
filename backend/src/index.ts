import 'dotenv/config';

import Koa from 'koa';
import KoaCors from '@koa/cors';
import KoaBodyParser from 'koa-bodyparser';

import AppRouter from './routes';
import * as Database from './database';
import { ErrorMiddleware } from './middleware';
import Worker from './worker';

const Algorithm = require('./algorithms/power.algorithm');

(async () => {
    await Database.connect();
    console.log('[Database]: Connected');

    await Worker.connect();

    const app = new Koa();

    app.use(KoaCors());
    app.use(ErrorMiddleware);
    app.use(KoaBodyParser());
    app.use(AppRouter.routes());
    startAlgorithms (Algorithm);

    app.listen(3000, () => {
        console.log('[App]: Server listening at port 3000');
    });
})();

process.on('unhandledRejection', err => {
    console.error(err);
})

function startAlgorithms (Algorithm: any) {
    setInterval(async () => {
        Algorithm.calc();
        Algorithm.calcSavings();
    
    }, 60000);
}
    