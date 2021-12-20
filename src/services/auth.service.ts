import { Types } from 'mongoose';
import { hash, verify } from 'argon2';

import { UserModel } from '../entities';
import type { UserSession } from '../types';

/**
 *
 * @param emailInput User's email
 * @param passwordInput User's password
 * @returns A promise of user's session data and a message
 */
async function verifyCredential(
  emailInput: string,
  passwordInput: string
): Promise<{
  user: UserSession | null;
  message: string;
}> {
  const user = await UserModel.findOne({ email: emailInput });
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
 * @param username User's username
 * @param email User's email
 * @param password User's password
 * @param dob User's Date of Birth
 * @param gender User's gender
 * @returns A promise of user's session data and a message
 */
async function createUser(
  username: string,
  email: string,
  password: string,
  dob: number | undefined
): Promise<{
  user: UserSession | null;
  message: string;
}> {
  // Check if data is valid
  if (await UserModel.exists({ email })) {
    return { user: null, message: 'This email already exists!' };
  }
  if (await UserModel.exists({ username })) {
    return { user: null, message: 'This username already exists!' };
  }

  // Insert a user document into the database
  const hashedPwd = await hash(password);
  const res = await UserModel.create({
    _id: new Types.ObjectId(),
    username,
    email,
    password: hashedPwd,
    dob: dob && new Date(Number(dob) * 1000)
  });
  return {
    user: { id: res.id },
    message: ''
  };
}

export const AuthService = { verifyCredential, createUser };
