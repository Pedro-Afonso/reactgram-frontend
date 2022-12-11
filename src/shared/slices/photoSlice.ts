import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  TLikePhotoRes,
  TPhoto,
  TUpdatePhotoRes,
  IPhotoState
} from '../interface'
import { photoService } from '../services'
import { RootState } from '../../store'

const initialState: IPhotoState = {
  photos: [],
  photo: null,
  error: null,
  success: false,
  loading: false,
  message: null
}

// Publish an user's photo
export const publishPhoto = createAsyncThunk<
  TPhoto,
  FormData,
  { rejectValue: string; state: RootState }
>('photo/publish', async (photo, { rejectWithValue, getState }) => {
  const { auth } = getState()

  if (!auth.token) return rejectWithValue('Ocorreu um erro!')

  const res = await photoService.publishPhoto(photo, auth.token)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

// Publish an user's photo
export const getUserPhotos = createAsyncThunk<
  TPhoto[],
  string,
  { rejectValue: string; state: RootState }
>('photo/userphotos', async (id, { rejectWithValue, getState }) => {
  const { auth } = getState()

  if (!auth.token) return rejectWithValue('Ocorreu um erro!')

  const res = await photoService.getUserPhotos(id, auth.token)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

export const deletePhoto = createAsyncThunk<
  { id: string; message: string },
  string,
  { rejectValue: string; state: RootState }
>('photo/delete', async (id, { rejectWithValue, getState }) => {
  const { auth } = getState()

  if (!auth.token) return rejectWithValue('Ocorreu um erro!')

  const res = await photoService.deletePhoto(id, auth.token)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

export const updatePhoto = createAsyncThunk<
  TUpdatePhotoRes,
  { title: string; id: string },
  { rejectValue: string; state: RootState }
>('photo/update', async (photo, { rejectWithValue, getState }) => {
  const { auth } = getState()

  if (!auth.token) return rejectWithValue('Ocorreu um erro!')

  const res = await photoService.updatePhoto(photo.title, photo.id, auth.token)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

export const getPhoto = createAsyncThunk<
  TPhoto,
  string,
  { rejectValue: string }
>('photo/getphoto', async (id, { rejectWithValue }) => {
  const res = await photoService.getPhoto(id)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

export const likePhoto = createAsyncThunk<
  TLikePhotoRes,
  string,
  { rejectValue: string; state: RootState }
>('photo/likephoto', async (id, { rejectWithValue, getState }) => {
  const { auth } = getState()

  if (!auth.token) return rejectWithValue('Ocorreu um erro!')

  const res = await photoService.likePhoto(id, auth.token)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

export const getAllPhotos = createAsyncThunk<
  TPhoto[],
  void,
  { rejectValue: string; state: RootState }
>('photo/getallphotos', async (_, { rejectWithValue, getState }) => {
  const { auth } = getState()

  if (!auth.token) return rejectWithValue('Ocorreu um erro!')

  const res = await photoService.getAllPhotos(auth.token)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

export const searchPhotos = createAsyncThunk<
  TPhoto[],
  string,
  { rejectValue: string; state: RootState }
>('photo/searchphotos', async (query, { rejectWithValue, getState }) => {
  const { auth } = getState()

  if (!auth.token) return rejectWithValue('Ocorreu um erro!')

  const res = await photoService.searchPhotos(query, auth.token)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

export const photoSlice = createSlice({
  name: 'publish',
  initialState,
  reducers: {
    resetPhoto: state => {
      state.photo = null
    },
    resetMessage: state => {
      state.message = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(publishPhoto.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.photo = action.payload
        state.photos.unshift(state.photo)
        state.message = 'Foto publicada com sucesso!'
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
      })
      .addCase(getUserPhotos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
      })
      .addCase(getUserPhotos.pending, state => {
        state.loading = true
        state.error = null
        state.photos = []
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.photos = action.payload
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
      })
      .addCase(deletePhoto.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.photos = state.photos.filter(photo => {
          return photo._id !== action.payload.id
        })
        state.message = action.payload.message
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
        state.photo = null
      })
      .addCase(updatePhoto.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.photos.map(photo => {
          if (photo._id === action.payload.photo._id) {
            return (photo.title = action.payload.photo.title)
          }
          return photo
        })
        state.message = action.payload.message
      })

      .addCase(getPhoto.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
      })
      .addCase(getPhoto.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getPhoto.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.photo = action.payload
      })
      .addCase(likePhoto.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
      })
      .addCase(likePhoto.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(likePhoto.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        if (state.photo?.likes) {
          state.photo.likes.push(action.payload.userId)
        }

        state.photos.map(photo => {
          if (photo._id === action.payload.photoId) {
            return photo.likes.push(action.payload.userId)
          }
          return photo
        })

        state.message = action.payload.message
      })
      .addCase(getAllPhotos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
      })
      .addCase(getAllPhotos.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllPhotos.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.photos = action.payload
      })
      .addCase(searchPhotos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
      })
      .addCase(searchPhotos.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(searchPhotos.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.photos = action.payload
      })
  }
})

export const { resetPhoto, resetMessage } = photoSlice.actions
export const { reducer: photoReducer } = photoSlice
