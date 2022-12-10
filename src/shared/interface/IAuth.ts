import { TUser } from './IUser'

export type TAuth = TUser & {
  email: string
  updatedAt: string
  __v: number
}
export type TErrors = { errors: string[] }

//  Requests
export interface IRegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface ILoginForm {
  email: string
  password: string
}

// Responses
export type TAuthRes =
  | { authUser: TAuth; token: string; message: string }
  | TErrors

// Redux State
export interface IAuthState {
  authUser: TAuth | null
  token: string | null
  error: string | null
  success: boolean
  loading: boolean
}
