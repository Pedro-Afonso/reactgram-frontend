import { IPhotoResponse } from '../interface'
import { api, fecthRequest, requestConfig } from '../utils'
import { handleError } from '../utils/handleError'

// Publish a photo
const publishPhoto = async (data: FormData, token: string) => {
  const config = requestConfig('POST', data, token, true)

  let res: IPhotoResponse = {}

  try {
    res = await fecthRequest<IPhotoResponse>(`${api}/photos`, config)
  } catch (error) {
    res.errors = [handleError(error)]
  }
  return res
}

// Get all user photos
const getUserPhotos = async (id: string, token: string) => {
  const config = requestConfig('GET', null, token)
  let res: IPhotoResponse = {}

  try {
    res = await fecthRequest<IPhotoResponse>(`${api}/photos/user/${id}`, config)
  } catch (error) {
    res.errors = [handleError(error)]
  }
  return res
}

// Delete a photo
const deletePhoto = async (id: string, token: string) => {
  const config = requestConfig('DELETE', null, token)

  let res: IPhotoResponse = {}

  try {
    res = await fecthRequest<IPhotoResponse>(`${api}/photos/${id}`, config)
  } catch (error) {
    res.errors = [handleError(error)]
  }
  return res
}

// Update a user photos
const updatePhoto = async (title: string, id: string, token: string) => {
  const config = requestConfig('PUT', { title }, token)

  let res: IPhotoResponse = {}

  try {
    res = await fecthRequest<IPhotoResponse>(`${api}/photos/${id}`, config)
  } catch (error) {
    res.errors = [handleError(error)]
  }
  return res
}

// Get user photo by id
const getPhoto = async (id: string) => {
  const config = requestConfig('GET')

  let res: IPhotoResponse = {}

  try {
    res = await fecthRequest<IPhotoResponse>(`${api}/photos/${id}`, config)
  } catch (error) {
    res.errors = [handleError(error)]
  }
  return res
}

// Like a photo
const likePhoto = async (id: string, token: string) => {
  const config = requestConfig('PUT', null, token)

  let res: IPhotoResponse = {}

  try {
    res = await fecthRequest<IPhotoResponse>(`${api}/photos/like/${id}`, config)
  } catch (error) {
    res.errors = [handleError(error)]
  }
  return res
}

// Add comment to a photo
const commentPhoto = async (
  id: string,
  data: { comment: string },
  token: string
) => {
  const config = requestConfig('PUT', data, token)

  let res: IPhotoResponse = {}

  try {
    res = await fecthRequest<IPhotoResponse>(
      `${api}/photos/comment/${id}`,
      config
    )
  } catch (error) {
    res.errors = [handleError(error)]
  }
  return res
}

// Get all photos
const getAllPhotos = async (token: string) => {
  const config = requestConfig('GET', null, token)

  let res: IPhotoResponse = {}

  try {
    res = await fecthRequest<IPhotoResponse>(`${api}/photos`, config)
  } catch (error) {
    res.errors = [handleError(error)]
  }
  return res
}

// Search photo by title
const searchPhotos = async (query: string, token: string) => {
  const config = requestConfig('GET', null, token)

  let res: IPhotoResponse = {}

  try {
    res = await fecthRequest<IPhotoResponse>(
      `${api}/photos/search?q=${query}`,
      config
    )
  } catch (error) {
    res.errors = [handleError(error)]
  }
  return res
}

export const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  getPhoto,
  likePhoto,
  commentPhoto,
  getAllPhotos,
  searchPhotos
}
