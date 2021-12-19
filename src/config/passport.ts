import passport from 'passport';
import * as passportLocal from 'passport-local';

import { AuthService } from '../services/auth.service';

const LocalStrategy = passportLocal.Strategy;

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', session: false },
    async (emailInput, passwordInput, done) => {
      try {
        const { user, message } = await AuthService.verifyUser(
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
  console.log('serialize called');
  done(null, user);
});

passport.deserializeUser((_, done) => {
  console.log('deserialize called');
  done(null, { id: '' });
});
