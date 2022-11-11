import { Box, Icon, IconButton, Paper, Typography } from '@mui/material'
import { TPhoto, TAuth } from '../../interface'

interface ILikeProps {
  photo: TPhoto
  authUser: TAuth | null
  handleLike: (photoId: string) => void
}

export const LikeButton: React.FC<ILikeProps> = ({
  photo,
  authUser,
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
