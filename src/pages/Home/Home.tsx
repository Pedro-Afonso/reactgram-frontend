import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { useEffect } from 'react'

import { getAllPhotos, likePhoto } from '../../shared/slices/photoSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { PhotoItem } from '../../shared/components'
import { addComment } from '../../shared/slices/commentSlice'

export const Home = () => {
  const dispatch = useAppDispatch()

  const { photos } = useAppSelector(state => state.photo)
  const { user: authUser } = useAppSelector(state => state.auth)

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
    </Box>
  )
}
