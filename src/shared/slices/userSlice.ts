import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IUserState, TCurrentUser, TUser } from '../interface'
import { userService } from '../services/userService'
import { RootState } from '../../store'

const initialState: IUserState = {
  user: null,
  authUser: null,
  error: null,
  success: false,
  loading: false
}

export const updateProfile = createAsyncThunk<
  { authUser: TCurrentUser },
  FormData,
  { rejectValue: string; state: RootState }
>('user/update', async (data, { rejectWithValue, getState }) => {
  const { auth } = getState()

  if (!auth.token) return rejectWithValue('Ocorreu um erro!')

  const res = await userService.updateProfile(data, auth.token)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

// Get user details
export const getUserDetails = createAsyncThunk<
  TUser,
  string,
  { rejectValue: string }
>('user/get', async (id, { rejectWithValue }) => {
  const res = await userService.getUserDetails(id)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state: IUserState) => {
      state.user = null
      state.error = null
      state.loading = false
      state.success = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(updateProfile.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.authUser = action.payload.authUser
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
        state.user = null
      })
      .addCase(getUserDetails.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
        state.user = null
      })
  }
})

export const { reset } = userSlice.actions
export const { reducer: userReducer } = userSlice
