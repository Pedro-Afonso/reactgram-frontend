import { IPhotoResponse } from "../interface";
import { api, fecthRequest, requestConfig } from "../utils";

// Publish an user's photo
const publishPhoto = async (data: FormData, token: string) => {
  const config = requestConfig("POST", data, token, true);

  const res = fecthRequest<IPhotoResponse>(`${api}/photos`, config);

  return res;
};

// Publish an user's photo
const getUserPhotos = async (id: string, token: string) => {
  const config = requestConfig("GET", null, token);

  const res = fecthRequest<IPhotoResponse>(`${api}/photos/user/${id}`, config);

  return res;
};

export const photoService = {
  publishPhoto,
  getUserPhotos,
};
