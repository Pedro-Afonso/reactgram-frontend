import { configureStore } from '@reduxjs/toolkit'
import { photoReducer } from '../shared/slices/photoSlice'
import { userReducer } from '../shared/slices/userSlice'
import { authReducer } from '../shared/slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    photo: photoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
