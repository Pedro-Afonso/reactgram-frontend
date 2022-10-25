import { Link, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { IPhoto } from '../../interface'
import { uploads } from '../../utils'

interface IPhotoItemProps {
  photo: IPhoto
  linkControl?: boolean
}

export const PhotoItem: React.FC<IPhotoItemProps> = ({
  photo,
  linkControl = false
}) => {
  const navigate = useNavigate()

  return (
    <Box
      component={Paper}
      width="100%"
      padding={2}
      marginX="auto"
      variant="outlined"
    >
      {photo.image && (
        <button
          onClick={() => {
            linkControl && navigate(`/photos/${photo._id}`)
          }}
        >
          <img
            width="100%"
            src={`${uploads}/photos/${photo.image}`}
            alt={photo.title}
            style={{ cursor: linkControl ? 'pointer' : 'auto' }}
          />
        </button>
      )}
      <Typography variant="h2" fontSize={18} fontWeight={400} marginTop={1}>
        {photo.title}
      </Typography>
      <Typography fontSize={12}>
        Publicado por:{' '}
        <Link
          component="button"
          onClick={() => navigate(`/users/${photo.userId}`)}
        >
          {photo.userName}
        </Link>
      </Typography>
    </Box>
  )
}
