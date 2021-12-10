export interface LoginReqBody {
  email?: string;
  password?: string;
}

export interface RegisterReqBody {
  username?: string;
  email?: string;
  password?: string;
  dob?: number;
  gender: string;
}
