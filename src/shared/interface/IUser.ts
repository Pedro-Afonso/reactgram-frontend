import { TErrors } from './IAuth'

export type TUser = {
  _id: string
  name: string
  createdAt: string
  bio?: string
  profileImage?: string
}

export type TCurrentUser = TUser & {
  email: string
  updatedAt: string
  __v: number
}

// Responses
// get current user and update user
export type TCurrentUserRes = TCurrentUser | TErrors

// get user by id response

export type TUserRes = TUser | TErrors

// Redux State
export interface IUserState {
  user: TUser | TCurrentUser | null
  error: string | null
  success: boolean
  loading: boolean
}
