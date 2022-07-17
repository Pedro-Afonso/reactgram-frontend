export const api = "http://localhost:5000/api";
export const uploads = "http://localhost:5000/uploads";

import { IUser } from "../interface";

interface IConfig {
  method?: string;
  body?: string | IUser;
  headers?: {
    "Content-Type"?: string;
    Authorization?: string;
  };
}

type IRequestConfigProps = (
  method: string,
  data?: IUser,
  token?: string | null,
  image?: string | null
) => RequestInit;

export const requestConfig: IRequestConfigProps = (
  method,
  data,
  token = null,
  image = null
) => {
  let config: IConfig;

  if (image) {
    config = {
      method: method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method: method,
      headers: {},
    };
  } else {
    config = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (token) {
    config = {
      ...config,
      headers: { ...config.headers, Authorization: `Bearer ${token}` },
    };
  }

  return config as RequestInit;
};
