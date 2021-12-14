import { hash, verify } from 'argon2';
import { emailRegex } from '../constants';
import { UserModel } from '../entities';

async function findUser(email: string) {
  const user = await UserModel.findOne({ email });
  if (user) {
    const { username, email, dob, gender, password } = user;
    return { username, email, dob: dob && dob.toString(), gender, password };
  }
  return undefined;
}

function verifyPassword(hashedValue: string, stringValue: string) {
  return verify(hashedValue, stringValue);
}

async function createUser(
  username: string,
  email: string,
  password: string,
  dob: number | undefined,
  gender: string | undefined
) {
  // Check if data is valid
  if (!emailRegex.test(email)) {
    throw new Error('Please enter a valid email!');
  }
  if (password.length < 6) {
    throw new Error('Password must contain 6 or more letters!');
  }
  if (gender && gender !== 'male' && gender !== 'female') {
    throw new Error('Please enter a valid gender!');
  }
  if (dob && typeof dob !== 'number') {
    throw new Error('Please enter a valid date of birth!');
  }
  const emailExists = await UserModel.exists({ email });
  if (emailExists) {
    throw new Error('This email already exists!');
  }
  const usernameExists = await UserModel.exists({ username });
  if (usernameExists) {
    throw new Error('This username already exists!');
  }

  // Insert a user document into the database
  const hashedPwd = await hash(password);
  await UserModel.create({
    username,
    email,
    password: hashedPwd,
    dob: dob && new Date(dob * 1000),
    gender
  });
}

export const AuthService = { findUser, createUser, verifyPassword };
