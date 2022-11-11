import {
  TDeleteRes,
  TPhotoRes,
  TUpdatePhotoRes,
  TLikePhotoRes,
  TPhotosRes
} from '../interface'
import { api, fecthRequest, requestConfig } from '../utils'
import { tryCatchService } from '../utils/tryCatchService'

// Publish a photo
const publishPhoto = async (data: FormData, token: string) => {
  const config = requestConfig('POST', data, token, true)

  return tryCatchService(async () => {
    return await fecthRequest<TPhotoRes>(`${api}/photos`, config)
  })
}

// Get all user photos
const getUserPhotos = async (id: string, token: string) => {
  const config = requestConfig('GET', null, token)

  return tryCatchService(async () => {
    return await fecthRequest<TPhotosRes>(`${api}/photos/user/${id}`, config)
  })
}

// Delete a photo
const deletePhoto = async (id: string, token: string) => {
  const config = requestConfig('DELETE', null, token)

  return tryCatchService(async () => {
    return fecthRequest<TDeleteRes>(`${api}/photos/${id}`, config)
  })
}

// Update a user photos
const updatePhoto = async (title: string, id: string, token: string) => {
  const config = requestConfig('PUT', { title }, token)

  return tryCatchService(async () => {
    return await fecthRequest<TUpdatePhotoRes>(`${api}/photos/${id}`, config)
  })
}

// Get user photo by id
const getPhoto = async (id: string) => {
  const config = requestConfig('GET')

  return tryCatchService(async () => {
    return await fecthRequest<TPhotoRes>(`${api}/photos/${id}`, config)
  })
}

// Like a photo
const likePhoto = async (id: string, token: string) => {
  const config = requestConfig('PUT', null, token)

  return tryCatchService(async () => {
    return await fecthRequest<TLikePhotoRes>(`${api}/photos/like/${id}`, config)
  })
}

// Get all photos
const getAllPhotos = async (token: string) => {
  const config = requestConfig('GET', null, token)

  return tryCatchService(async () => {
    return await fecthRequest<TPhotosRes>(`${api}/photos`, config)
  })
}

// Search photo by title
const searchPhotos = async (query: string, token: string) => {
  const config = requestConfig('GET', null, token)

  return tryCatchService(async () => {
    return await fecthRequest<TPhotosRes>(
      `${api}/photos/search?q=${query}`,
      config
    )
  })
}

export const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  getPhoto,
  likePhoto,
  getAllPhotos,
  searchPhotos
}
