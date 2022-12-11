import { api, requestConfig, fecthRequest } from '../utils'
import { TCurrentUserRes, TUserRes } from '../interface'
import { tryCatchService } from '../utils/tryCatchService'

// Update user details
const updateProfile = async (data: FormData, token: string) => {
  const config = requestConfig('PUT', data, token, true)

  return tryCatchService(async () => {
    return await fecthRequest<TCurrentUserRes>(`${api}/users/`, config)
  })
}

// Get user details
const getUserDetails = async (id: string) => {
  const config = requestConfig('GET')

  return tryCatchService(async () => {
    return await fecthRequest<TUserRes>(`${api}/users/${id}`, config)
  })
}

export const userService = { updateProfile, getUserDetails }
