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

import { TComment } from '../../interface'

interface ICommentItemProps {
  comment: TComment
  currentUserId?: string
  deleteComment: (value: string) => void
}

export const CommentItem: React.FC<ICommentItemProps> = ({
  comment,
  currentUserId,
  deleteComment
}) => {
  const canDelete = currentUserId === comment.user._id

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
          <IconButton onClick={() => deleteComment(comment._id)}>
            <Icon>delete_forever</Icon>
          </IconButton>
        )}
      </Box>
    </Card>
  )
}
