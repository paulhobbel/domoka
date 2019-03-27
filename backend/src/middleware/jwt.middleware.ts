import KoaJwt from 'koa-jwt';

export const JwtMiddleware = KoaJwt({
    secret: process.env.JWT_SECRET || 'some-secret'
});