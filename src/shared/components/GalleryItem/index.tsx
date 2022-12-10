import { useNavigate, useParams } from 'react-router-dom'

import ImageListItemBar from '@mui/material/ImageListItemBar'
import ImageListItem from '@mui/material/ImageListItem'
import IconButton from '@mui/material/IconButton'
import Icon from '@mui/material/Icon'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { deletePhoto } from '../../slices/photoSlice'
import { DialogEditPhoto } from '../../components'
import { TPhoto } from '../../interface'

interface IGalleryItemProps {
  photo: TPhoto
}

export const GalleryItem: React.FC<IGalleryItemProps> = ({ photo }) => {
  const { id } = useParams()

  const dispatch = useAppDispatch()

  const authUser = useAppSelector(state => state.auth.authUser)

  const navigate = useNavigate()

  const isTheProfileOwner = id === authUser!._id

  // Delete a photo
  const handleDelete = () => {
    dispatch(deletePhoto(photo._id))
  }

  return (
    <ImageListItem key={photo._id}>
      {photo.image && <img src={photo.image} alt={photo.title} />}

      <ImageListItemBar
        actionIcon={
          <>
            <IconButton onClick={() => navigate(`/photos/${photo._id}`)}>
              <Icon>visibility</Icon>
            </IconButton>
            {isTheProfileOwner && (
              <>
                {/* Edit Button */}
                <DialogEditPhoto photo={photo} />
                {/* /Edit Button */}

                {/* Delete Button */}
                <IconButton onClick={handleDelete}>
                  <Icon>delete</Icon>
                </IconButton>
                {/* /Delete Button */}
              </>
            )}
          </>
        }
      />
    </ImageListItem>
  )
}
