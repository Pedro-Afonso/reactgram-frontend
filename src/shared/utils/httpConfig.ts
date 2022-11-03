import { ILoginForm, IRegisterForm, IUserIdToken } from '../interface'

export const api = import.meta.env.VITE_API

interface IConfig {
  method?: string
  body?:
    | string
    | IRegisterForm
    | ILoginForm
    | IUserIdToken
    | FormData
    | null
    | { title: string }
    | { comment: string }
  headers?: {
    'Content-Type'?: string
    Authorization?: string
  }
}

type IRequestConfigProps = (
  method: string,
  data?:
    | IRegisterForm
    | ILoginForm
    | IUserIdToken
    | FormData
    | null
    | { title: string }
    | { comment: string },
  token?: string | null,
  image?: boolean | null
) => RequestInit

export const requestConfig: IRequestConfigProps = (
  method,
  data,
  token = null,
  image = null
) => {
  let config: IConfig

  if (image) {
    config = {
      method,
      body: data,
      headers: {}
    }
  } else if (method === 'DELETE' || data === null) {
    config = {
      method,
      headers: {}
    }
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }

  if (token) {
    config = {
      ...config,
      headers: { ...config.headers, Authorization: `Bearer ${token}` }
    }
  }

  return config as RequestInit
}
