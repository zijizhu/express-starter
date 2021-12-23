declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }
}

export interface LoginReqBody {
  email?: string;
  password?: string;
}

export interface RegisterReqBody {
  username: string;
  email: string;
  password: string;
  dob?: number;
}

export interface UserSession {
  id: number;
}
