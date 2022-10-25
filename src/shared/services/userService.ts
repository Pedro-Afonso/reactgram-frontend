import { handleError } from './../utils/handleError'
import { IUserResponse } from '../interface/IUser'
import { api, requestConfig, fecthRequest } from '../utils'

// Get user details
const profile = async (data: FormData | null, token: string) => {
  const config = requestConfig('GET', data, token)

  let res: IUserResponse = {}

  try {
    res = await fecthRequest<IUserResponse>(`${api}/users/profile`, config)
  } catch (error) {
    res.errors = [handleError(error)]
  }
  return res
}

// Update user details
const updateProfile = async (data: FormData, token: string) => {
  const config = requestConfig('PUT', data, token, true)

  let res: IUserResponse = {}

  try {
    res = await fecthRequest<IUserResponse>(`${api}/users/`, config)
  } catch (error) {
    res.errors = [handleError(error)]
  }
  return res
}

// Get user details
const getUserDetails = async (id: string) => {
  const config = requestConfig('GET')

  let res: IUserResponse = {}

  try {
    res = await fecthRequest<IUserResponse>(`${api}/users/${id}`, config)
  } catch (error) {
    res.errors = [handleError(error)]
  }
  return res
}

export const userService = { profile, updateProfile, getUserDetails }
