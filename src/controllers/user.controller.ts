import PromiseRouter from 'express-promise-router';

const router = PromiseRouter();

router.get('/', async (_, res) => {
  res.status(200).json({ message: 'hello!' });
});

export const UserController = router;
