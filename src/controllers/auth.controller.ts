import PromiseRouter from 'express-promise-router';

const router = PromiseRouter();

router.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: 'one of email or passoword is missing' });
  }
  try {
    return res.json('');
  } catch (error) {
    return res.status(400).json({ message: 'email or password incorrect' });
  }
});

export const AuthController = router;
