import { api, requestConfig, fecthRequest } from '../utils'

import {
  IRegisterForm,
  TAuthRes,
  ILoginForm,
  TCurrentUserRes
} from '../interface'
import { tryCatchService } from '../utils/tryCatchService'

// Register a user and sign in
const register = async (user: IRegisterForm) => {
  const config = requestConfig('POST', user)

  return tryCatchService(async () => {
    const res = await fecthRequest<TAuthRes>(`${api}/users/register`, config)

    if ('token' in res) {
      sessionStorage.setItem('userToken', JSON.stringify(res.token))
    }
    return res
  })
}

// Logout a user
const logout = () => {
  sessionStorage.removeItem('userToken')
}

// Sign in a user
const login = async (data: ILoginForm) => {
  const config = requestConfig('POST', data)

  return tryCatchService(async () => {
    const res = await fecthRequest<TAuthRes>(`${api}/users/login`, config)

    if ('token' in res) {
      sessionStorage.setItem('userToken', JSON.stringify(res.token))
    }
    return res
  })
}

// Get current auth user
const profile = async (token: string) => {
  const config = requestConfig('GET', null, token)

  return tryCatchService(async () => {
    return await fecthRequest<TCurrentUserRes>(`${api}/users/profile`, config)
  })
}

export const authService = { profile, register, logout, login }
