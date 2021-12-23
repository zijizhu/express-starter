import prisma from '../client';

/**
 *
 * @param id UserID stored in the session, attached to req.user by passport.js
 * @returns User info object if found
 */
async function getUserInfo(id: number) {
  const res = await prisma.user.findUnique({ where: { id } });
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
