import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { Paper } from '@mui/material'

import { Box } from '@mui/system'

import {
  commentPhoto,
  getPhoto,
  likePhoto
} from '../../shared/slices/photoSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { LikeButton, PhotoItem } from '../../shared/components'

import { CommentItem } from '../../shared/components/CommentItem/CommentItem'
import { CommentForm } from '../../shared/components/CommentForm/CommentForm'

export const Photo = () => {
  const { id } = useParams()

  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.auth)
  const { photo, loading } = useAppSelector(state => state.photo)

  const handleLike = (photoId: string) => {
    dispatch(likePhoto(photoId))
  }

  // Load photo data
  useEffect(() => {
    if (id) {
      dispatch(getPhoto(id))
    }
  }, [id, dispatch])

  const handleComment = (
    e: React.FormEvent<HTMLFormElement>,
    textComment: string
  ) => {
    e.preventDefault()

    if (!id) {
      return
    }

    const commentData = {
      comment: textComment,
      id
    }

    dispatch(commentPhoto(commentData))
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <Box
      maxWidth={700}
      marginX="auto"
      marginTop={10}
      paddingY={2}
      component={Paper}
    >
      {photo && (
        <>
          <PhotoItem photo={photo} />
          <LikeButton photo={photo} user={user} handleLike={handleLike} />
          <CommentForm handleComment={handleComment} />
          <Box>
            {photo.comments.map((comment, key) => (
              <CommentItem comment={comment} key={key} />
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}
