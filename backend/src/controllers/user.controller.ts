import Koa from 'koa';
import Boom from 'boom';
import { getRepository } from 'typeorm';
import { User } from '../entities';

export class UserController {
    getMe = async (ctx: Koa.Context) => {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(ctx.state.user.id);

        if(!user)
            throw Boom.unauthorized();
        
        ctx.status = 200;
        ctx.body = {
            statusCode: 200,
            user: {
                username: user.username
            }
        }
    }
}