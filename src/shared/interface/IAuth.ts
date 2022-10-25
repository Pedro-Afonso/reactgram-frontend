export interface IProfile {
  name: string
  email: string
  bio?: string
  profileImage?: string
  password?: string
}
export interface IUserIdToken {
  _id: string
  token: string
}

export interface IUserAuthState {
  user?: IUserIdToken | null
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

export interface IUserAuth {
  name?: string
  email: string
  password: string
  confirmPassword?: string
}

export interface IRegisterResponse {
  user?: IUserIdToken
  errors?: string[]
}
export interface IUserResponse {
  user?: IProfile
  errors?: string[]
}
