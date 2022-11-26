import ImageList from '@mui/material/ImageList'

import { useAppSelector } from '../../hooks'
import { GalleryItem } from '../../components'

export const Gallery = () => {
  const photos = useAppSelector(state => state.photo.photos)

  return (
    <ImageList cols={3}>
      {photos &&
        photos.map(photo => <GalleryItem key={photo._id} photo={photo} />)}
    </ImageList>
  )
}
