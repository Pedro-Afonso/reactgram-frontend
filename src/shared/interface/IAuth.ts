export interface IUserAuth {
  _id: string;
  token: string;
}

export interface IUserState {
  user: IUserAuth | null;
  error: string | null;
  success: boolean;
  loading: boolean;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterResponse {
  user: IUserAuth;
  errors: string[];
}
