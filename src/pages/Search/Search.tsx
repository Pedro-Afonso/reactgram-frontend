import { useEffect } from 'react'

import { Box } from '@mui/system'

import { likePhoto, searchPhotos } from '../../shared/slices/photoSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { LikeButton, PhotoItem } from '../../shared/components'
import { useQuery } from '../../shared/hooks/useQuery'

export const Search = () => {
  const dispatch = useAppDispatch()

  const { user: authUser } = useAppSelector(state => state.auth)

  const { photos } = useAppSelector(state => state.photo)

  const query = useQuery()
  const search = query.get('q')

  useEffect(() => {
    if (search) {
      dispatch(searchPhotos(search))
    }
  }, [search, dispatch])

  const handleLike = (photoId: string) => {
    dispatch(likePhoto(photoId))
  }

  return (
    <Box maxWidth={700} marginX="auto" marginTop={10} paddingY={2}>
      {photos &&
        photos.map((photo, key) => (
          <Box key={key} marginBottom={2}>
            <PhotoItem photo={photo} linkControl />

            <LikeButton
              user={authUser}
              photo={photo}
              handleLike={() => handleLike(photo._id)}
            />
          </Box>
        ))}
    </Box>
  )
}
