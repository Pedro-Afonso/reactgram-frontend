import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import { getComments, addComment } from '../../shared/slices/commentSlice'
import { getPhoto, likePhoto } from '../../shared/slices/photoSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { Comments } from '../../shared/components/Comments'
import { PhotoItem } from '../../shared/components'

export const Photo = () => {
  const { id } = useParams()

  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.auth)
  const { photo, loading: ladingPhotos } = useAppSelector(state => state.photo)

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

          <Comments />
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
