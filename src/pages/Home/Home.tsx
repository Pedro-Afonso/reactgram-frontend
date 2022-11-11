import { useNavigate } from 'react-router-dom'
import { Backdrop, Box, CircularProgress } from '@mui/material'
import { useEffect } from 'react'

import { getAllPhotos, likePhoto } from '../../shared/slices/photoSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { addComment } from '../../shared/slices/commentSlice'
import { PhotoItem } from '../../shared/components'

export const Home = () => {
  const dispatch = useAppDispatch()

  const { photos, loading: loadingPhoto } = useAppSelector(state => state.photo)
  const { user: authUser, loading: loadingAuth } = useAppSelector(
    state => state.auth
  )

  const navigate = useNavigate()

  // Load photos
  useEffect(() => {
    dispatch(getAllPhotos())
  }, [dispatch])

  const handleLike = (photoId: string) => {
    dispatch(likePhoto(photoId))
  }

  const handleSubmitComment = (comment: string, photoId: string) => {
    dispatch(addComment({ comment, photoId }))
  }

  return (
    <Box maxWidth={700} marginX="auto" marginTop={10} paddingY={2}>
      {photos &&
        photos.map((photo, key) => (
          <Box key={key} marginBottom={2}>
            <PhotoItem
              authUser={authUser}
              photo={photo}
              navigate={navigate}
              handleLike={handleLike}
              handleSubmitComment={handleSubmitComment}
            />
          </Box>
        ))}
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.modal + 1 }}
        open={loadingAuth || loadingPhoto}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}
