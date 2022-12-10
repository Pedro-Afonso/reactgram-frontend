import {
  Box,
  Backdrop,
  CircularProgress,
  Divider,
  Paper,
  Typography
} from '@mui/material'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { ProfileHeader, Gallery, DialogAddPhoto } from '../../shared/components'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { getUserPhotos } from '../../shared/slices/photoSlice'
import { getUserDetails } from '../../shared/slices/userSlice'

export const Profile = () => {
  const { id } = useParams()

  const dispatch = useAppDispatch()

  const authUser = useAppSelector(state => state.auth.authUser)

  const loadingUser = useAppSelector(state => state.user.loading)
  const loadingAuth = useAppSelector(state => state.auth.loading)
  const loadingPhoto = useAppSelector(state => state.photo.loading)

  const isTheProfileOwner = id === authUser!._id

  // Load user data
  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id))
      dispatch(getUserPhotos(id))
    }
  }, [id, dispatch])

  return (
    <Box
      component="main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        component={Paper}
        paddingX={4}
        paddingY={2}
      >
        <ProfileHeader />
        <Box width="100%">
          <Divider />
          <Box marginY={3}>
            <Typography variant="h3" fontSize={18} textAlign="center">
              {isTheProfileOwner
                ? 'Compartilhe algum momento seu:'
                : 'Publicações'}
            </Typography>
          </Box>

          {/* Button to open the image upload modal */}
          {isTheProfileOwner ? (
            <Box display="flex" justifyContent="center">
              <DialogAddPhoto />
            </Box>
          ) : null}
          {/* /Button to open the image upload modal */}
        </Box>
        <Box>
          <Typography variant="h2" fontSize={16}>
            Fotos publicadas:
          </Typography>

          <Box maxWidth={800}>
            <Gallery />
          </Box>
        </Box>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.modal + 1 }}
        open={loadingUser || loadingAuth || loadingPhoto}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}
