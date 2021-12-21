import PromiseRouter from 'express-promise-router';

import { UserService } from '../services';

const router = PromiseRouter();

router.get('/', async (req, res) => {
  if (req.user) {
    const userInfo = await UserService.getUserInfo(req.user.id);
    if (userInfo) {
      return res.status(200).json(userInfo);
    }
    return res.status(500).json({ message: 'User not found!' });
  }
  return res.status(401).json({ message: 'Unauthorized!' });
});

export const UserController = router;
