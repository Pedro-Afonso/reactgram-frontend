import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { getComments } from '../../shared/slices/commentSlice'
import { Comments } from '../../shared/components/Comments'
import { getPhoto } from '../../shared/slices/photoSlice'
import { PhotoItem } from '../../shared/components'

export const Photo = () => {
  const { id } = useParams()

  const dispatch = useAppDispatch()

  const { photo, loading: ladingPhotos } = useAppSelector(state => state.photo)

  // Load photo data
  useEffect(() => {
    if (id) {
      dispatch(getPhoto(id))
      dispatch(getComments(id))
    }
  }, [id, dispatch])

  return (
    <Box maxWidth={700} marginX="auto" marginY={10} component={Paper}>
      {photo && (
        <>
          <PhotoItem photo={photo} photoLink={false} />

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
