import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'process';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    passport.use(
      new Strategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET,
        },
        (payload, done) => {
          const expirationDate = new Date(payload.expires);
          const currentDate = new Date();
          if (expirationDate <= currentDate) {
            throw new UnauthorizedException('Token has expired');
          }
          return done(null, payload);
        },
      ),
    );

    passport.authenticate('jwt', { session: false })(req, res, next);
  }
}
