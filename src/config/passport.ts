import passport from 'passport';
import type { Request, Response, NextFunction } from 'express';
import * as passportLocal from 'passport-local';

import { AuthService } from '../services/auth.service';

const LocalStrategy = passportLocal.Strategy;

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', session: false },
    async (emailInput, passwordInput, done) => {
      try {
        const { user, message } = await AuthService.verifyCredential(
          emailInput,
          passwordInput
        );
        if (user) {
          return done(null, user, { message });
        } else {
          return done(null, false, { message });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  done(null, { id: id as string });
});

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized!' });
}
