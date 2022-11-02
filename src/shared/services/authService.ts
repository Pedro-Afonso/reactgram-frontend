import { handleError } from './../utils/handleError'
import { api, requestConfig, fecthRequest } from '../utils'

import { IRegisterForm, IAuthResponse, ILoginForm } from '../interface'

// Register a user and sign in
const register = async (user: IRegisterForm) => {
  const config = requestConfig('POST', user)

  const res = {} as IAuthResponse

  try {
    const res = await fecthRequest<IAuthResponse>(
      `${api}/users/register`,
      config
    )

    if (res.token) {
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
const login = async (data: ILoginForm) => {
  const config = requestConfig('POST', data)
  let res = {} as IAuthResponse
  try {
    res = await fecthRequest<IAuthResponse>(`${api}/users/login`, config)

    if (res.token) {
      localStorage.setItem('user', JSON.stringify(res))
    }
  } catch (error) {
    res.errors = [handleError(error)]
  }
  return res
}

export const authService = { register, logout, login }
