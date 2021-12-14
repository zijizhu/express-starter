import type { Request } from 'express';
import PromiseRouter from 'express-promise-router';
import passport from 'passport';

import { AuthService } from '../services/auth.service';
import type { RegisterReqBody } from '../types';

const router = PromiseRouter();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (error, user, info) => {
    if (error) {
      return res.status(400).json(info);
    }
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(400).json(info);
  })(req, res, next);
});

router.post('/register', async (req: Request<{}, {}, RegisterReqBody>, res) => {
  const { username, email, password, dob, gender } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'one of username or email or passoword is missing' });
  }
  try {
    await AuthService.createUser(username, email, password, dob, gender);
    return res.status(200).json({ message: 'success!' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export const AuthController = router;
