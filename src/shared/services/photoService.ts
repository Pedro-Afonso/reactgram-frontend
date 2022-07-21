import { IPhotoResponse } from "../interface";
import { api, fecthRequest, requestConfig } from "../utils";

// Publish an user's photo
const publishPhoto = async (data: FormData, token: string) => {
  const config = requestConfig("POST", data, token, true);

  const res = fecthRequest<IPhotoResponse>(`${api}/photos`, config);

  return res;
};

export const photoService = {
  publishPhoto,
};
