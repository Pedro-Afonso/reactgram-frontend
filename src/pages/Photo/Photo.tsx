import { Backdrop, Box, CircularProgress, Paper } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { CommentItem } from '../../shared/components/CommentItem/CommentItem'
import { getPhoto, likePhoto } from '../../shared/slices/photoSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { PhotoItem } from '../../shared/components'

export const Photo = () => {
  const { id } = useParams()

  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.auth)
  const { photo, loading } = useAppSelector(state => state.photo)

  const navigate = useNavigate()

  const handleLike = (photoId: string) => {
    dispatch(likePhoto(photoId))
  }

  // Load photo data
  useEffect(() => {
    if (id) {
      dispatch(getPhoto(id))
    }
  }, [id, dispatch])

  return (
    <Box maxWidth={700} marginX="auto" marginTop={10} component={Paper}>
      {photo && (
        <>
          <PhotoItem
            photo={photo}
            user={user}
            handleLike={handleLike}
            navigate={navigate}
            photoLink={false}
          />
          <Box>
            {photo.comments.map((comment, key) => (
              <CommentItem comment={comment} key={key} />
            ))}
          </Box>
        </>
      )}

      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}
