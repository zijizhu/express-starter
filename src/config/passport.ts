import * as passportLocal from 'passport-local';
import passport from 'passport';

import { AuthService } from '../services/auth.service';

const LocalStrategy = passportLocal.Strategy;

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email' },
    async (emailInput, passwordInput, done) => {
      try {
        const user = await AuthService.findUser(emailInput);
        if (user) {
          const { password, ...userInfo } = user;
          if (await AuthService.verifyPassword(password, passwordInput)) {
            return done(null, userInfo);
          }
          return done(null, false, { message: 'Password is incorrect!' });
        } else {
          return done(null, false, { message: 'Email not found!' });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
