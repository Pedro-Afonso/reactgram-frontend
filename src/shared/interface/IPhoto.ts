import { TErrors } from './IAuth'

type TUser = {
  _id: string
  name: string
  profileImage?: string
}

/*
type TComment = {
  _id: string
  text: string
  user: TUser
  createdAt: string
} */

export type TPhoto = {
  _id: string
  image: string
  title: string
  likes: string[]
  comments: string[]
  user: TUser
  createdAt: string
  updatedAt: string
  __v: number
}

// Responses
// insert photo
export type TPhotoRes = TPhoto | TErrors

// delete a photo

// update photo by id
export type TUpdatePhotoRes = { photo: TPhoto; message: string }

// get photo by id

// get all photos
export type TPhotosRes = TPhoto[] | TErrors

// get all photos by user

// search photo by title name

// like a photo
export type TLikePhotoRes = { photoId: string; userId: string; message: string }

// Redux State
export interface IPhotoState {
  photos: TPhoto[]
  photo: TPhoto | null
  error: string | null
  success: boolean
  loading: boolean
  message: string | null
}
