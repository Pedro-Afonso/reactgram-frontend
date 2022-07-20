import { IProfile, IUserIdToken, IUserResponse } from "../interface";
import { api, requestConfig, fecthRequest } from "../utils";

// Get user details
const profile = async (data: FormData | null, token: string) => {
  const config = requestConfig("GET", data, token);

  const res = await fecthRequest<IProfile>(`${api}/users/profile`, config);

  return res;
};

// Update user details
const updateProfile = async (data: FormData, token: string) => {
  const config = requestConfig("PUT", data, token, true);

  const res = await fecthRequest<IUserResponse>(`${api}/users/`, config);

  return res;
};

export const userService = { profile, updateProfile };
