import { hash, verify } from 'argon2';

import prisma from '../client';
import type { UserSession } from '../types';

/**
 *
 * @param emailInput User's email input
 * @param passwordInput User's password input
 * @returns A promise of user's session data and a message
 */
async function verifyCredential(
  emailInput: string,
  passwordInput: string
): Promise<{
  user: UserSession | null;
  message: string;
}> {
  const user = await prisma.user.findFirst({ where: { email: emailInput } });
  if (!user) {
    return { user: null, message: 'Email not found!' };
  }
  const { id, password } = user;
  if (await verify(password, passwordInput)) {
    return { user: { id }, message: 'Success!' };
  }
  return { user: null, message: 'Password is incorrect!' };
}

/**
 *
 * @param username User's username input
 * @param email User's email input
 * @param password User's password input
 * @param dob User's Date of Birth input
 * @returns A promise of user's session data and a message
 */
async function createUser(
  username: string,
  email: string,
  password: string,
  dob: string | undefined
): Promise<{
  user: UserSession | null;
  message: string;
}> {
  // Check if data is valid
  const emailCount = await prisma.user.count({
    where: { email }
  });
  if (emailCount > 0) {
    return { user: null, message: 'This email already exists!' };
  }
  const usernameCount = await prisma.user.count({
    where: { username }
  });
  if (usernameCount > 0) {
    return { user: null, message: 'This username already exists!' };
  }

  // Insert a user document into the database
  const hashedPwd = await hash(password);
  const { id } = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPwd,
      dob: dob && new Date(Number(dob) * 1000)
    }
  });
  return {
    user: { id },
    message: ''
  };
}

export const AuthService = { verifyCredential, createUser };
