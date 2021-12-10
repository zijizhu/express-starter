import { hash, verify } from 'argon2';
import { UserModel } from '../entities';

async function findUser(email: string, password: string) {
  const user = await UserModel.findOne({ email });
  if (user) {
    if (!(await verify(user.password, password))) {
      throw new Error('Your password is incorrect!');
    }
    const { username, email, dob, gender } = user;
    return { username, email, dob: dob && dob.toString(), gender };
  } else {
    throw new Error('Email not found!');
  }
}

async function createUser(
  username: string,
  email: string,
  password: string,
  dob: number | undefined,
  gender: string | undefined
) {
  // Checking if the data is valid

  // Todo: check date as well
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    throw new Error('Please enter a valid email');
  }
  if (gender && gender !== 'male' && gender !== 'female') {
    throw new Error('Please enter a valid gender');
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

export const AuthService = { findUser, createUser };
