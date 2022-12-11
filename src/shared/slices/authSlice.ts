import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../store'

import {
  ILoginForm,
  IRegisterForm,
  TAuth,
  IAuthState,
  TCurrentUser
} from '../interface'
import { authService } from '../services/authService'

const localUser = sessionStorage.getItem('userToken')
const token: string | null = localUser ? JSON.parse(localUser) : null

const initialState: IAuthState = {
  authUser: null,
  token,
  error: null,
  success: false,
  loading: false
}

// Register a user and sign in
export const register = createAsyncThunk<
  { authUser: TAuth; token: string; message: string },
  IRegisterForm,
  { rejectValue: string }
>('auth/register', async (data, { rejectWithValue }) => {
  const res = await authService.register(data)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

// Logout a user
export const logout = createAsyncThunk('auth/logout', () => {
  authService.logout()
})

// Sign in a user
export const login = createAsyncThunk<
  { authUser: TAuth; token: string; message: string },
  ILoginForm,
  { rejectValue: string }
>('auth/login', async (user, { rejectWithValue }) => {
  const res = await authService.login(user)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

// Get user details, for edit data
export const profile = createAsyncThunk<
  { authUser: TCurrentUser },
  void,
  { rejectValue: string; state: RootState }
>('auth/profile', async (_, { rejectWithValue, getState }) => {
  const { auth } = getState()

  if (!auth.token) return rejectWithValue('Ocorreu um erro!')

  const res = await authService.profile(auth.token)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.authUser = null
      state.error = null
      state.loading = false
      state.success = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(profile.pending, state => {
        state.loading = true
        state.error = null
        state.authUser = null
      })
      .addCase(profile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.authUser = action.payload.authUser
      })
      .addCase(register.pending, state => {
        state.loading = true
        state.error = null
        state.token = null
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
        state.authUser = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.authUser = action.payload.authUser
        state.token = action.payload.token
      })

      .addCase(logout.fulfilled, state => {
        state.token = null
        state.loading = false
        state.success = true
        state.error = null
        state.authUser = null
      })
      .addCase(login.pending, state => {
        state.loading = true
        state.error = null
        state.token = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
        state.authUser = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.authUser = action.payload.authUser
        state.token = action.payload.token
      })
  }
})

export const { reset } = authSlice.actions
export const { reducer: authReducer } = authSlice
