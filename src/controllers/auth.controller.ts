import type { Request } from 'express';
import PromiseRouter from 'express-promise-router';

import { AuthService } from '../services/auth.service';
import type { LoginReqBody, RegisterReqBody } from '../types';

const router = PromiseRouter();

router.post('/login', async (req: Request<{}, {}, LoginReqBody>, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'One of email or passoword is missing!' });
  }
  try {
    const userInfo = await AuthService.findUser(email, password);
    return res.json(userInfo);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
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
