import passport from 'passport';
import PromiseRouter from 'express-promise-router';
import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

import { AuthService } from '../services';
import type { LoginReqBody, RegisterReqBody } from '../types';

const router = PromiseRouter();

router.get('/', (_, res) => res.status(200).json({ message: 'success' }));

/**
 * Log the user in with the credentials
 */
router.post(
  '/login',
  body('email', 'Please enter a valid email!').isEmail(),
  body('password', 'Please enter the password!').notEmpty(),
  function (
    req: Request<{}, {}, LoginReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    passport.authenticate('local', (error, user, info) => {
      if (error) {
        return res.status(400).json(info);
      }
      if (user) {
        req.logIn(user, (err) => {
          if (err) {
            next(err);
          }
          return res.status(200).json({ message: 'Success!' });
        });
      }
      return res.status(400).json(info);
    })(req, res, next);
    return;
  }
);

/**
 * Create a new account, and log the user in if successful
 */
router.post(
  '/register',
  body('email', 'Please enter a valid email!').isEmail(),
  body('username', 'Please enter a valid username!').isString(),
  body('password', 'Please enter a stronger password!').isLength({ min: 6 }),
  body('dob', 'Please enter a valid date of birth!').optional().isNumeric(),
  async function (
    req: Request<{}, {}, RegisterReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password, dob } = req.body;
    try {
      const { user, message } = await AuthService.createUser(
        username,
        email,
        password,
        `${dob}`
      );
      if (user) {
        req.logIn(user, (err) => {
          if (err) {
            next(err);
          }
          return res.status(200).json({ message: 'Success!' });
        });
      }
      return res.status(400).json({ message });
    } catch (error) {
      return res.status(500);
    }
  }
);

/**
 * Logs the user out
 */
router.get('/logout', function (req, res) {
  req.logout();
  res.status(200).json({ message: 'Success!' });
});

export const AuthController = router;
