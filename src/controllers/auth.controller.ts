import passport from 'passport';
import PromiseRouter from 'express-promise-router';
import type { Request, Response, NextFunction } from 'express';

import { AuthService } from '../services/auth.service';
import type { LoginReqBody, RegisterReqBody } from '../types';

const router = PromiseRouter();

function logDetails(req: Request) {
  console.log('---------------------');
  console.log('user: ', req.user);
  console.log('cookies: ', req.cookies);
  console.log('session id: ', req.session.id);
  console.log('session: ', req.session);
}

router.get('/', (req, res: Response) => {
  logDetails(req);
  return res.status(200).json({ message: 'hi' });
});

/**
 * Log the user in with the credentials
 */
router.post(
  '/login',
  function (
    req: Request<{}, {}, LoginReqBody>,
    res: Response,
    next: NextFunction
  ) {
    passport.authenticate('local', (error, user, info) => {
      if (error) {
        return res.status(400).json(info);
      }
      if (user) {
        req.logIn({ id: '1' }, (err) => {
          if (err) {
            next(err);
          }
          return res.status(200).json({ message: 'Success!' });
        });
      }
      logDetails(req);
      return res.status(400).json(info);
    })(req, res, next);
  }
);

/**
 * Create a new account, and log the user in if successful
 */
router.post(
  '/register',
  async function (
    req: Request<{}, {}, RegisterReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const { username, email, password, dob, gender } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide all required fields!' });
    }
    try {
      const { user, message } = await AuthService.createUser(
        username,
        email,
        password,
        dob,
        gender
      );
      console.log('sessionID before register: ', req.sessionID);
      if (user) {
        req.logIn({ id: '1' }, (err) => {
          if (err) {
            next(err);
          }
          return res.status(200).json({ message: 'success' });
        });
      }
      logDetails(req);
      return res.status(400).json({ message });
    } catch (error) {
      return res.status(500);
    }
  }
);

export const AuthController = router;
