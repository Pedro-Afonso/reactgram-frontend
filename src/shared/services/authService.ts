import { api, requestConfig, fecthRequest } from '../utils'

import { IRegisterForm, TAuthRes, ILoginForm } from '../interface'
import { tryCatchService } from '../utils/tryCatchService'

// Register a user and sign in
const register = async (user: IRegisterForm) => {
  const config = requestConfig('POST', user)

  return tryCatchService(async () => {
    const res = await fecthRequest<TAuthRes>(`${api}/users/register`, config)

    if ('token' in res) {
      localStorage.setItem('user', JSON.stringify(res))
    }
    return res
  })
}

// Logout a user
const logout = () => {
  localStorage.removeItem('user')
}

// Sign in a user
const login = async (data: ILoginForm) => {
  const config = requestConfig('POST', data)

  return tryCatchService(async () => {
    const res = await fecthRequest<TAuthRes>(`${api}/users/login`, config)

    if ('token' in res) {
      localStorage.setItem('user', JSON.stringify(res))
    }
    return res
  })
}

export const authService = { register, logout, login }
