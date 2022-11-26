import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useAppSelector } from '../../hooks'
import { CommentItem } from '../CommentItem'

export const Comments = () => {
  const comments = useAppSelector(state => state.comment.comments)
  const loadingComments = useAppSelector(state => state.comment.loading)

  return (
    <>
      {loadingComments ? (
        <Box display="flex" justifyContent="center" paddingY={2}>
          <CircularProgress color="inherit" />
        </Box>
      ) : null}
      {comments && comments.length > 0 ? (
        <Box display="flex" flexDirection="column-reverse">
          {comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </Box>
      ) : null}
      {(!comments || !(comments.length > 0)) && !loadingComments ? (
        <Box display="flex" justifyContent="center" paddingY={2}>
          <Typography>{'Seja o primeiro a comentar :)'}</Typography>
        </Box>
      ) : null}
    </>
  )
}
