import { Box, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'

interface ICommentFormProps {
  photoId: string
  handleSubmitComment: (comment: string, photoId: string) => void
}

export const CommentForm: React.FC<ICommentFormProps> = ({
  photoId,
  handleSubmitComment
}) => {
  const [comment, setComment] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!photoId || !comment.trim()) {
      return
    }

    handleSubmitComment(comment, photoId)

    setComment('')
  }

  return (
    <Box component="form" onSubmit={onSubmit} display="flex" width="100%">
      <TextField
        fullWidth
        variant="filled"
        color="secondary"
        label="Adicione um comentário"
        type="text"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <LoadingButton
        type="submit"
        variant="contained"
        disabled={!photoId || !comment}
      >
        Enviar
      </LoadingButton>
    </Box>
  )
}
