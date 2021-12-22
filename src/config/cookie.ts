import session from 'express-session';

import { __prod__ } from '../constants';

export const cookieConfig: session.CookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
  httpOnly: true,
  sameSite: 'lax', // Allows cross-site requests
  secure: __prod__
};
