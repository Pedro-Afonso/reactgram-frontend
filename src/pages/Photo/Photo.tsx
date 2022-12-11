import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { getComments } from '../../shared/slices/commentSlice'
import { Comments } from '../../shared/components/Comments'
import { getPhoto, resetPhoto } from '../../shared/slices/photoSlice'
import { PhotoItem } from '../../shared/components'

export const Photo = () => {
  const { id } = useParams()

  const dispatch = useAppDispatch()

  const photo = useAppSelector(state => state.photo.photo)
  const ladingPhoto = useAppSelector(state => state.photo.loading)

  // Load photo data
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    dispatch(resetPhoto())
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
        open={ladingPhoto}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}
