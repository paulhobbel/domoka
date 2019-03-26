import Koa from 'koa';
import Boom from 'boom';
import { getRepository, ChangeStream } from 'typeorm';
import { User } from '../entities';
import { AuthController } from './auth.controller';

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

    updateMe = async (ctx: Koa.Context) => {
      const { username, oldPassword, newPassword } = ctx.request.body;
      const userRepository = getRepository(User);

      const user = await userRepository.findOne(ctx.state.user.id);

      if(!user)
        throw Boom.unauthorized();

      if (username)
        user.username = username;
      
      if(oldPassword && newPassword) {
        if (await AuthController.validatePassword(user.password, oldPassword)) {
          user.password = await AuthController.generateHash(newPassword);
        } else {
          throw Boom.badRequest("Password did not match current password");
        }
      }

      await user.save();

      ctx.status = 200;
      ctx.body = {
          statusCode: 200,
          user: {
            username: user.username
          }
      }
    }
}
