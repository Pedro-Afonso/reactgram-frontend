export const api = import.meta.env.VITE_API

interface IConfig {
  method?: string
  body?: any
  headers?: {
    'Content-Type'?: string
    Authorization?: string
  }
}

type IRequestConfigProps = (
  method: string,
  data?: any,
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
