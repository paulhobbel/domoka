import Router from "koa-router";
import controllers from './controllers';
import { JwtMiddleware } from "./middleware";

const router = new Router();

router.get('/', controllers.misc.getStatus);
router.get('/devices', JwtMiddleware, controllers.device.getDevices);
router.get('/devices/:id', JwtMiddleware, controllers.device.getDevice);

router.get('/users/@me', JwtMiddleware, controllers.user.getMe);

router.post('/auth/login', controllers.auth.postLogin);
router.post('/auth/register', controllers.auth.postRegister);


export default router;