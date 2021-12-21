import { UserModel } from '../entities';

/**
 *
 * @param id UserID stored in the session, attached to req.user by passport.js
 * @returns User info object if found
 */
async function getUserInfo(id: string) {
  const res = await UserModel.findById(id);
  if (res) {
    return {
      username: res.username,
      email: res.email,
      dob: res.dob
    };
  }
  return null;
}

export const UserService = { getUserInfo };
