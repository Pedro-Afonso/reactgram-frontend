import Box from '@mui/material/Box'

import { useAppSelector } from '../../hooks'
import { PhotoItem } from '../../components'

export const PhotoFeed = () => {
  const photos = useAppSelector(state => state.photo.photos)

  return (
    <>
      {photos &&
        photos.map(photo => (
          <Box key={photo._id} marginBottom={2}>
            <PhotoItem photo={photo} />
          </Box>
        ))}
    </>
  )
}
