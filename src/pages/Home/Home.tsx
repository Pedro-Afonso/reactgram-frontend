import { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'

import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { getAllPhotos } from '../../shared/slices/photoSlice'
import { profile } from '../../shared/slices/userSlice'
import { PhotoFeed } from '../../shared/components'

export const Home = () => {
  const dispatch = useAppDispatch()

  const loadingPhoto = useAppSelector(state => state.photo.loading)

  const loadingAuth = useAppSelector(state => state.auth.loading)

  // Load photos
  useEffect(() => {
    dispatch(profile())
    dispatch(getAllPhotos())
  }, [dispatch])

  return (
    <Box maxWidth={700} marginX="auto" marginTop={10} paddingY={2}>
      <PhotoFeed />
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.modal + 1 }}
        open={loadingAuth || loadingPhoto}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}
