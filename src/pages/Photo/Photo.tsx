import { Backdrop, Box, CircularProgress, Paper } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import {
  getComments,
  deleteComment,
  addComment
} from '../../shared/slices/commentSlice'
import { getPhoto, likePhoto } from '../../shared/slices/photoSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { PhotoItem, CommentItem } from '../../shared/components'

export const Photo = () => {
  const { id } = useParams()

  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.auth)
  const { photo, loading: ladingPhotos } = useAppSelector(state => state.photo)
  const { comments, loading: loadingComments } = useAppSelector(
    state => state.comment
  )

  const navigate = useNavigate()

  // Load photo data
  useEffect(() => {
    if (id) {
      dispatch(getPhoto(id))
      dispatch(getComments(id))
    }
  }, [id, dispatch])

  const handleLike = (photoId: string) => {
    dispatch(likePhoto(photoId))
  }

  const handleDeleteComment = (commentId: string) => {
    dispatch(deleteComment(commentId))
  }

  const handleSubmitComment = (comment: string, photoId: string) => {
    dispatch(addComment({ comment, photoId }))
  }

  return (
    <Box maxWidth={700} marginX="auto" marginY={10} component={Paper}>
      {photo && (
        <>
          <PhotoItem
            photo={photo}
            authUser={user}
            handleLike={handleLike}
            navigate={navigate}
            photoLink={false}
            handleSubmitComment={handleSubmitComment}
          />

          {comments && !loadingComments ? (
            <Box>
              {comments.map((comment, key) => (
                <CommentItem
                  deleteComment={handleDeleteComment}
                  currentUserId={user?._id}
                  comment={comment}
                  key={key}
                />
              ))}
            </Box>
          ) : (
            <Box display="flex" justifyContent="center" paddingY={2}>
              <CircularProgress color="inherit" />
            </Box>
          )}
        </>
      )}

      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={ladingPhotos}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}
