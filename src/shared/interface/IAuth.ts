export type TAuth = { _id: string; token: string; profileImage?: string }
export type TErrors = string[]

export interface IRegisterForm {
  name?: string
  email: string
  password: string
  confirmPassword?: string
}

export interface ILoginForm {
  email: string
  password: string
}

export interface IAuthResponse extends TAuth {
  errors: TErrors
}

// excluir

export interface IProfile {
  name: string
  email: string
  bio?: string
  profileImage?: string
  password?: string
}
export interface IUserResponse {
  user?: IProfile
  errors?: string[]
}

export interface IUserIdToken {
  _id: string
  token: string
}

export interface IUserAuthState {
  user?: TAuth | null
  error?: string | null
  success: boolean
  loading: boolean
  message?: string | null
}

export interface IUserProfileState {
  user: IProfile | null
  error: string | null
  success: boolean
  loading: boolean
  message?: string | null
}
