import { useEffect } from 'react'

import { Box } from '@mui/material'

import { getAllPhotos, likePhoto } from '../../shared/slices/photoSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { PhotoItem } from '../../shared/components'
import { useNavigate } from 'react-router-dom'

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

  return (
    <Box maxWidth={700} marginX="auto" marginTop={10} paddingY={2}>
      {photos &&
        photos.map((photo, key) => (
          <Box key={key} marginBottom={2}>
            <PhotoItem
              user={authUser}
              photo={photo}
              navigate={navigate}
              handleLike={handleLike}
            />
          </Box>
        ))}
    </Box>
  )
}
