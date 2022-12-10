import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Icon from '@mui/material/Icon'
import Box from '@mui/material/Box'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { likePhoto } from '../../slices/photoSlice'
import { TPhoto } from '../../interface'

interface ILikeProps {
  photo: TPhoto
}

export const LikeButton: React.FC<ILikeProps> = ({ photo }) => {
  const dispatch = useAppDispatch()

  const authUser = useAppSelector(state => state.auth.authUser)

  const handleLike = (photoId: string) => {
    dispatch(likePhoto(photoId))
  }

  return (
    <Box
      component={Paper}
      width="100%"
      padding={2}
      display="flex"
      justifyContent="end"
      alignItems="center"
      variant="outlined"
    >
      {photo.likes && authUser && (
        <>
          {photo.likes.includes(authUser._id) ? (
            <IconButton>
              <Icon>favorite</Icon>
            </IconButton>
          ) : (
            <IconButton onClick={() => handleLike(photo._id)}>
              <Icon>favorite_border</Icon>
            </IconButton>
          )}
          <Typography>{photo.likes.length}</Typography>
        </>
      )}
    </Box>
  )
}
