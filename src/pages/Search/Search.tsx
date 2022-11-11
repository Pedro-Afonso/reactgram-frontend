import { Box, Backdrop, CircularProgress, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { likePhoto, searchPhotos } from '../../shared/slices/photoSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { addComment } from '../../shared/slices/commentSlice'
import { useQuery } from '../../shared/hooks/useQuery'
import { PhotoItem } from '../../shared/components'

export const Search = () => {
  const dispatch = useAppDispatch()

  const { user: authUser, loading: loadingAuth } = useAppSelector(
    state => state.auth
  )

  const { photos, loading: loadingPhoto } = useAppSelector(state => state.photo)

  const query = useQuery()
  const search = query.get('q')

  useEffect(() => {
    if (search) {
      dispatch(searchPhotos(search))
    }
  }, [search, dispatch])

  const navigate = useNavigate()

  const handleLike = (photoId: string) => {
    dispatch(likePhoto(photoId))
  }

  const handleSubmitComment = (comment: string, photoId: string) => {
    dispatch(addComment({ comment, photoId }))
  }

  return (
    <Box maxWidth={700} marginX="auto" marginTop={10} paddingY={2}>
      <Typography>{`Mostrando buscas para "${search}"`}</Typography>
      {photos &&
        photos.map((photo, key) => (
          <Box key={key} marginBottom={2}>
            <PhotoItem
              authUser={authUser}
              photo={photo}
              handleLike={handleLike}
              navigate={navigate}
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
