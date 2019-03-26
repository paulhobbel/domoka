import Router from "koa-router";
import controllers from './controllers';
import { JwtMiddleware } from "./middleware";

const router = new Router();

router.get('/', controllers.misc.getStatus);

router.get('/devices', JwtMiddleware, controllers.device.getDevices);
router.post('/devices', JwtMiddleware, controllers.device.createDevice);
router.post('/devices/:id', JwtMiddleware, controllers.device.toggleDevice);
router.get('/devices/:id', JwtMiddleware, controllers.device.getDevice);
router.patch('/devices/:id', JwtMiddleware, controllers.device.editDevice);
router.delete('/devices/:id', JwtMiddleware, controllers.device.deleteDevice);

router.get('/schedules', JwtMiddleware, controllers.schedule.getSchedules);
router.post('/schedules', JwtMiddleware, controllers.schedule.createSchedule);
router.get('/schedules/:id', JwtMiddleware, controllers.schedule.getSchedule);
router.patch('/schedules/:id', JwtMiddleware, controllers.schedule.editSchedule);
router.delete('/schedules/:id', JwtMiddleware, controllers.schedule.deleteSchedule);

router.get('/power', JwtMiddleware, controllers.power.getPower);
router.post('/power', JwtMiddleware, controllers.power.resetPower);

router.get('/users/@me', JwtMiddleware, controllers.user.getMe);
router.patch('/users/@me', JwtMiddleware, controllers.user.updateMe);

router.post('/auth/login', controllers.auth.postLogin);
router.post('/auth/register', controllers.auth.postRegister);

export default router;