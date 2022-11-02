import { Box, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'

import { commentPhoto } from '../../slices/photoSlice'
import { useAppDispatch } from '../../hooks'

interface ICommentFormProps {
  id?: string
}

export const CommentForm: React.FC<ICommentFormProps> = ({ id }) => {
  const dispatch = useAppDispatch()

  const [comment, setComment] = useState('')

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!id || !comment.trim()) {
      return
    }

    const commentData = {
      comment,
      id
    }

    dispatch(commentPhoto(commentData))

    setComment('')
  }

  return (
    <Box component="form" onSubmit={handleComment} display="flex" width="100%">
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
        disabled={!id || !comment}
      >
        Enviar
      </LoadingButton>
    </Box>
  )
}
