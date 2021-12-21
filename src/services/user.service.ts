import { UserModel } from '../entities';

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
