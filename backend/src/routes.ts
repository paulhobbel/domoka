import Router from "koa-router";
import controllers from './controllers';

const router = new Router();

router.post('/auth/login', controllers.auth.postLogin);
router.post('/auth/register', controllers.auth.postRegister);

export default router;