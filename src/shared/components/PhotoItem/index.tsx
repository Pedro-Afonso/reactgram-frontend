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

import { TPhoto, TAuth } from '../../interface'
import { CommentForm } from '../CommentForm'
import { LikeButton } from '../LikeButton'

interface IPhotoItemProps {
  photo: TPhoto
  authUser: TAuth | null
  photoLink?: boolean
  handleLike: (photoId: string) => void
  navigate: (value: string) => void
  handleSubmitComment: (comment: string, photoId: string) => void
}

export const PhotoItem: React.FC<IPhotoItemProps> = ({
  photo,
  authUser,
  navigate,
  handleLike,
  handleSubmitComment,
  photoLink = true
}) => {
  const date = new Date(photo.createdAt).toLocaleDateString()
  const time = new Date(photo.createdAt).toLocaleTimeString()
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            onClick={() => navigate(`/users/${photo.user._id}`)}
            src={photo?.user.profileImage}
            aria-label={photo?.user.name}
            sx={{ cursor: 'pointer' }}
          />
        }
        action={
          <IconButton disabled aria-label="settings">
            <Icon>more_verticon</Icon>
          </IconButton>
        }
        title={photo?.user.name}
        subheader={
          <Typography component="span" title={`${date} ${time}`} fontSize={14}>
            {date}
            <Typography component="span" title={time} fontSize={10}>
              {' '}
              {time}
            </Typography>
          </Typography>
        }
      />

      {photo.image && (
        <CardActionArea
          disabled={!photoLink}
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
            onClick={() => navigate && navigate(`/users/${photo.user._id}`)}
            color="secondary"
          >
            {photo.user.name}
          </Link>
        </Typography>
      </CardContent>
      <CardActions>
        <LikeButton photo={photo} authUser={authUser} handleLike={handleLike} />
      </CardActions>
      <CardActions>
        <CommentForm
          photoId={photo._id}
          handleSubmitComment={handleSubmitComment}
        />
      </CardActions>
    </Card>
  )
}
