import { IProfile, IUserIdToken } from "../interface";
import { api, requestConfig, fecthRequest } from "../utils";

// Get user details
const profile = async (data: FormData | null, token: string) => {
  const config = requestConfig("GET", data, token);

  const res = await fecthRequest<IProfile>(`${api}/users/profile`, config);

  return res;
};

export const userService = { profile };
