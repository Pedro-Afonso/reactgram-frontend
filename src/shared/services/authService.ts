import { handleError } from './../utils/handleError'
import { api, requestConfig, fecthRequest } from '../utils'

import { IUserAuth, IRegisterResponse } from '../interface'

// Register a user
const register = async (user: IUserAuth) => {
  const config = requestConfig('POST', user)

  const res: IRegisterResponse = {}

  try {
    const res = await fecthRequest<IRegisterResponse>(
      `${api}/users/register`,
      config
    )

    if (res) {
      localStorage.setItem('user', JSON.stringify(res))
    }
  } catch (error) {
    res.errors = [handleError(error)]
  }
  return res
}

// Logout a user
const logout = () => {
  localStorage.removeItem('user')
}

// Sign in a user
const login = async (data: Omit<IUserAuth, 'name' | 'confirmPassword'>) => {
  const config = requestConfig('POST', data)
  let res: IRegisterResponse = {}
  try {
    res = await fecthRequest<IRegisterResponse>(`${api}/users/login`, config)
    if (res.user) {
      localStorage.setItem('user', JSON.stringify(res.user))
    }
  } catch (error) {
    res.errors = [handleError(error)]
  }
  return res
}

export const authService = { register, logout, login }
