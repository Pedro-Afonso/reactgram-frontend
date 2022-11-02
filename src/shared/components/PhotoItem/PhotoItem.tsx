import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Link,
  Typography,
  Icon
} from '@mui/material'

import { IPhoto, IUserIdToken } from '../../interface'
import { CommentForm } from '../CommentForm/CommentForm'
import { LikeButton } from '../LikeButton/LikeButton'

interface IPhotoItemProps {
  photo: IPhoto
  user?: IUserIdToken | null
  photoLink?: boolean
  handleLike: (photoId: string) => void
  navigate: (value: string) => void
}

export const PhotoItem: React.FC<IPhotoItemProps> = ({
  photo,
  user,
  navigate,
  handleLike,
  photoLink = true
}) => {
  const date = new Date(photo.createdAt)
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            onClick={() => navigate(`/users/${photo.userId}`)}
            aria-label={photo?.userName}
            sx={{ cursor: 'pointer' }}
          >
            R
          </Avatar>
        }
        action={
          <IconButton disabled aria-label="settings">
            <Icon>more_verticon</Icon>
          </IconButton>
        }
        title={photo?.userName}
        subheader={`${date.toLocaleTimeString()} ${date.toLocaleDateString()}`}
      />

      {photo.image && (
        <CardActionArea
          disabled={!navigate}
          onClick={() => {
            photoLink && navigate(`/photos/${photo._id}`)
          }}
        >
          <CardMedia component="img" src={photo.image} alt={photo.title} />
        </CardActionArea>
      )}
      <CardContent>
        <Typography variant="h2" fontSize={18} fontWeight={400} marginTop={1}>
          {photo.title}
        </Typography>
        <Typography fontSize={12}>
          Publicado por:{' '}
          <Link
            component="button"
            onClick={() => navigate && navigate(`/users/${photo.userId}`)}
            color="secondary"
          >
            {photo.userName}
          </Link>
        </Typography>
      </CardContent>
      <CardActions>
        <LikeButton photo={photo} user={user} handleLike={handleLike} />
      </CardActions>
      <CardActions>
        <CommentForm id={photo._id} />
      </CardActions>
    </Card>
  )
}
