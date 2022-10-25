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

export interface IUserProfileState {
  user: IProfile | null
  error: string | null
  success: boolean
  loading: boolean
  message?: string | null
}
