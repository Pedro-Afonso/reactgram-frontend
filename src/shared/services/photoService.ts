import {
  IDeleteResponse,
  IErrors,
  IPhoto,
  IPhotoResponse,
  IPhotoMessageErrors,
  ILikeErrors,
  ICommentsMessageErrors,
} from "../interface";
import { api, fecthRequest, requestConfig } from "../utils";

// Publish a photo
const publishPhoto = async (data: FormData, token: string) => {
  const config = requestConfig("POST", data, token, true);

  const res = fecthRequest<IPhotoResponse>(`${api}/photos`, config);

  return res;
};

// Get all user photos
const getUserPhotos = async (id: string, token: string) => {
  const config = requestConfig("GET", null, token);

  const res = fecthRequest<IPhotoResponse>(`${api}/photos/user/${id}`, config);

  return res;
};

// Delete a photo
const deletePhoto = async (id: string, token: string) => {
  const config = requestConfig("DELETE", null, token);

  const res = fecthRequest<IDeleteResponse>(`${api}/photos/${id}`, config);

  return res;
};

// Update a user photos
const updatePhoto = async (title: string, id: string, token: string) => {
  const config = requestConfig("PUT", { title }, token);

  const res = fecthRequest<IPhotoMessageErrors>(`${api}/photos/${id}`, config);

  return res;
};

// Get user photo by id
const getPhoto = async (id: string) => {
  const config = requestConfig("GET");

  const res = fecthRequest<IPhotoMessageErrors>(`${api}/photos/${id}`, config);

  return res;
};

// Like a photo
const likePhoto = async (id: string, token: string) => {
  const config = requestConfig("PUT", null, token);

  const res = fecthRequest<ILikeErrors>(`${api}/photos/like/${id}`, config);

  return res;
};

// Add comment to a photo
const commentPhoto = async (
  id: string,
  data: { comment: string },
  token: string
) => {
  const config = requestConfig("PUT", data, token);

  const res = fecthRequest<ICommentsMessageErrors>(
    `${api}/photos/comment/${id}`,
    config
  );

  return res;
};

export const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  getPhoto,
  likePhoto,
  commentPhoto,
};
