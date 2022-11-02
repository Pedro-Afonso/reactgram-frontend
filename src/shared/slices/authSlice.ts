import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  IUserIdToken,
  IUserAuthState,
  TAuth,
  ILoginForm,
  IRegisterForm
} from '../interface'
import { authService } from '../services/authService'

const localUser = localStorage.getItem('user')
const user: IUserIdToken = localUser ? JSON.parse(localUser) : null

const initialState: IUserAuthState = {
  user: user || null,
  error: null,
  success: false,
  loading: false
}

// Register a user and sign in
export const register = createAsyncThunk<
  TAuth,
  IRegisterForm,
  { rejectValue: string }
>('auth/register', async (data, { rejectWithValue }) => {
  const res = await authService.register(data)

  // Check for errors
  if (res.errors) {
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
  TAuth,
  ILoginForm,
  { rejectValue: string }
>('auth/login', async (user, { rejectWithValue }) => {
  const res = await authService.login(user)

  // Check for errors
  if (res.errors) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state: IUserAuthState) => {
      state.loading = false
      state.error = null
      state.success = false
      state.user = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
        state.user = null
      })
      .addCase(logout.fulfilled, state => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = null
      })
      .addCase(login.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ? action.payload : null
        state.user = null
      })
  }
})

export const { reset } = authSlice.actions
export const { reducer: authReducer } = authSlice
