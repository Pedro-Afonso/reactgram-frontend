import { api, requestConfig, fecthRequest } from "../utils";

import { IUser, IRegisterResponse } from "../interface";

// Register a user
const register = async (user: IUser) => {
  const config = requestConfig("POST", user);

  const res = await fecthRequest<IRegisterResponse>(
    `${api}/users/register`,
    config
  );

  if (res) {
    localStorage.setItem("user", JSON.stringify(res));
  }

  return res;
};

// Logout a user
const logout = () => {
  localStorage.removeItem("user");
};

// Sign in a user
const login = async (data: Omit<IUser, "name" | "confirmPassword">) => {
  const config = requestConfig("POST", data);

  const res = await fecthRequest<IRegisterResponse>(
    `${api}/users/login`,
    config
  );

  if (res) {
    localStorage.setItem("user", JSON.stringify(res));
  }

  return res;
};

export const authService = { register, logout, login };
