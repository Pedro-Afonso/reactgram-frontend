import {
  Box,
  Typography,
  Avatar,
  Paper,
  Card,
  CardContent,
  IconButton,
  Icon
} from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../hooks'

import { TComment } from '../../interface'
import { deleteComment } from '../../slices/commentSlice'

interface ICommentItemProps {
  comment: TComment
}

export const CommentItem: React.FC<ICommentItemProps> = ({ comment }) => {
  const dispatch = useAppDispatch()

  const authUser = useAppSelector(state => state.auth.authUser)

  const canDelete = authUser?._id === comment.user._id

  const handleDeleteComment = () => {
    if (!canDelete) return
    dispatch(deleteComment(comment._id))
  }

  return (
    <Card component={Paper} variant="outlined">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="start"
        gap={1}
      >
        <CardContent>
          <Box display="flex" justifyContent="start" alignItems="start" gap={1}>
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={comment.user.profileImage}
              alt={comment.user.name}
            />

            <Typography display="inline" fontSize={16}>
              <Typography component="span" fontWeight={600} fontSize={16}>
                {comment.user.name}
              </Typography>{' '}
              {comment.text}
            </Typography>
          </Box>
        </CardContent>

        {canDelete && (
          <IconButton onClick={handleDeleteComment}>
            <Icon>delete_forever</Icon>
          </IconButton>
        )}
      </Box>
    </Card>
  )
}
