import { api, requestConfig, fecthRequest } from '../utils'
import { TCommentsRes, TCommentRes, TDeleteRes } from '../interface'
import { tryCatchService } from '../utils/tryCatchService'

// Create a comment
const addComment = async (
  data: { comment: string; photoId: string },
  token: string
) => {
  const config = requestConfig('POST', data, token)

  return tryCatchService(async () => {
    return await fecthRequest<TCommentRes>(`${api}/comments`, config)
  })
}

// Delete a comment
const deleteComment = async (photoId: string, token: string) => {
  const config = requestConfig('DELETE', null, token)

  return tryCatchService(async () => {
    return await fecthRequest<TDeleteRes>(`${api}/comments/${photoId}`, config)
  })
}

// get comments
const getComments = async (id: string) => {
  const config = requestConfig('GET')

  return tryCatchService(async () => {
    return await fecthRequest<TCommentsRes>(`${api}/comments/${id}`, config)
  })
}

export const commentService = {
  addComment,
  deleteComment,
  getComments
}
