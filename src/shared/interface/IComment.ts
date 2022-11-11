import { TErrors } from './IAuth'

export type TComment = {
  _id: string
  text: string
  user: {
    _id: string
    name: string
    profileImage?: string
  }
  createdAt: string
}

export type TMessage = { message: string }

// Request

// Insert comment response
export type TCommentRes = { comment: TComment; message: string } | TErrors

// Delete comment response
export type TDeleteRes = { id: string; message: string } | TErrors

// Insert comment response
export type TCommentsRes = { comments: TComment[] } | TErrors

// Redux State
export interface ICommentState {
  comments: TComment[] | null
  comment: TComment | null
  error: string | null
  message: string | null
  success: boolean
  loading: boolean
}
