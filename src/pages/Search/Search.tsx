import { Box, Backdrop, CircularProgress, Typography } from '@mui/material'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { searchPhotos } from '../../shared/slices/photoSlice'
import { useQuery } from '../../shared/hooks/useQuery'
import { PhotoFeed } from '../../shared/components'

export const Search = () => {
  const dispatch = useAppDispatch()

  const loadingAuth = useAppSelector(state => state.auth.loading)

  const loadingPhoto = useAppSelector(state => state.photo.loading)

  const query = useQuery()
  const search = query.get('q')

  useEffect(() => {
    if (search) {
      dispatch(searchPhotos(search))
    }
  }, [search, dispatch])

  return (
    <Box maxWidth={700} marginX="auto" marginTop={10} paddingY={2}>
      <Typography>{`Mostrando buscas para "${search}"`}</Typography>
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
