import { LoadingButton } from '@mui/lab'
import { Box, Paper, TextField } from '@mui/material'
import { useState } from 'react'

interface ICommentFormProps {
  handleComment: (
    e: React.FormEvent<HTMLFormElement>,
    textCommentForm: string
  ) => void
}

export const CommentForm: React.FC<ICommentFormProps> = ({ handleComment }) => {
  const [textComment, setTextComment] = useState('')

  return (
    <form
      onSubmit={e => {
        handleComment(e, textComment)
        setTextComment('')
      }}
    >
      <Box
        width="98%"
        marginX="auto"
        marginY={2}
        component={Paper}
        variant="elevation"
        elevation={24}
        padding={2}
      >
        <Box>
          <TextField
            fullWidth
            variant="standard"
            label="Deixe o seu comentário:"
            type="text"
            value={textComment}
            onChange={e => setTextComment(e.target.value)}
          />
        </Box>
        <Box marginTop={4}>
          <LoadingButton type="submit" fullWidth variant="contained">
            Enviar
          </LoadingButton>
        </Box>
      </Box>
    </form>
  )
}
