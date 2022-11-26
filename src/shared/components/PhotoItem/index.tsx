import { useNavigate } from 'react-router-dom'

import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardMedia from '@mui/material/CardMedia'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Icon from '@mui/material/Icon'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { addComment } from '../../slices/commentSlice'
import { likePhoto } from '../../slices/photoSlice'
import { CommentForm } from '../CommentForm'
import { LikeButton } from '../LikeButton'
import { TPhoto } from '../../interface'

interface IPhotoItemProps {
  photo: TPhoto

  photoLink?: boolean
}

export const PhotoItem: React.FC<IPhotoItemProps> = ({
  photo,
  photoLink = true
}) => {
  const authUser = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLike = (photoId: string) => {
    dispatch(likePhoto(photoId))
  }

  const handleSubmitComment = (comment: string, photoId: string) => {
    dispatch(addComment({ comment, photoId }))
  }

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
