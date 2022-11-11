import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { TComment, ICommentState } from '../interface'
import { commentService } from '../services'
import { RootState } from '../../store'

const initialState: ICommentState = {
  comments: null,
  comment: null,
  error: null,
  message: null,
  success: false,
  loading: false
}

// Create comment user details, for edit data
export const addComment = createAsyncThunk<
  { comment: TComment; message: string },
  { comment: string; photoId: string },
  { rejectValue: string; state: RootState }
>('comment/addcomment', async (data, { rejectWithValue, getState }) => {
  const { auth } = getState()

  if (!auth.user) return rejectWithValue('Ocorreu um erro!')

  const res = await commentService.addComment(data, auth.user.token)

  // Check for errors
  if ('errors' in res) return rejectWithValue(res.errors[0])

  return res
})

export const deleteComment = createAsyncThunk<
  { id: string; message: string },
  string,
  { rejectValue: string; state: RootState }
>('comment/deletecomment', async (id, { rejectWithValue, getState }) => {
  const { auth } = getState()

  if (!auth.user) return rejectWithValue('Ocorreu um erro!')

  const res = await commentService.deleteComment(id, auth.user.token)

  // Check for errors
  if ('errors' in res) return rejectWithValue(res.errors[0])

  return res
})

export const getComments = createAsyncThunk<
  { comments: TComment[] },
  string,
  { rejectValue: string }
>('comment/getcomments', async (id, { rejectWithValue }) => {
  const res = await commentService.getComments(id)

  // Check for errors
  if ('errors' in res) return rejectWithValue(res.errors[0])

  return res
})

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    reset: state => {
      state.comments = null
      state.comment = null
      state.error = null
      state.message = null
      state.success = false
      state.loading = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
      })
      .addCase(addComment.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.message = action.payload.message
        state.comment = action.payload.comment
        state.comments?.push(action.payload.comment)
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
      })
      .addCase(deleteComment.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.message = action.payload.message
        state.comments =
          state.comments &&
          state.comments.filter(comment => comment._id !== action.payload.id)
      })
      .addCase(getComments.rejected, state => {
        state.loading = false
      })
      .addCase(getComments.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.comments = action.payload.comments
      })
  }
})

export const { reset } = commentSlice.actions
export const { reducer: commentReducer } = commentSlice
