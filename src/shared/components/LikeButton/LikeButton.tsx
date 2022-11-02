import { Box, Icon, IconButton, Paper, Typography } from '@mui/material'
import { IPhoto, IUserIdToken } from '../../interface'

interface ILikeProps {
  photo: IPhoto
  user?: IUserIdToken | null
  handleLike: (photoId: string) => void
}

export const LikeButton: React.FC<ILikeProps> = ({
  photo,
  user,
  handleLike
}) => {
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
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
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
