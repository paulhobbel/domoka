import { BaseContext } from "koa";
import bcrypt from "bcrypt";
import Boom from "boom";
import jwt from "jsonwebtoken";

import { User } from "../entities";

export class AuthController {

    postLogin = async (ctx: BaseContext) => {
        const { username, password } = ctx.request.body;

        if(!username || !password)
            throw Boom.badRequest();

        const foundUser = await User.findOne({ username });
        if(!foundUser || !await this.validatePassword(foundUser.password, password))
            throw Boom.unauthorized('No user with the given username and password was found');

        ctx.body = {
            token: this.generateJWT(foundUser),
            user: {
                id: foundUser.id,
                username: foundUser.username
            }
        }
    }

    postRegister = async (ctx: BaseContext) => {
        const { username, password } = ctx.request.body;

        if(!username || !password)
            throw Boom.badRequest();

        const foundUser = await User.findOne({ username });
        if(foundUser)
            throw Boom.badRequest('A user with the given username already exists');

        const createdUser = await User.create({
            username,
            password: await this.generateHash(password)
        }).save();

        ctx.body = {
            token: this.generateJWT(createdUser),
            user: {
                id: createdUser.id,
                username: createdUser.username
            }
        };
    }

    private async generateHash(password: string) {
        return await bcrypt.hash(password, 10);
    }

    private async validatePassword(hash: string, password: string) {
        return await bcrypt.compare(password, hash);
    }

    private generateJWT(user: User) {
        return jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET || 'some-secret', {
            expiresIn: '1d'
        })
    }
}