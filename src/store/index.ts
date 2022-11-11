import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from '../shared/slices/authSlice'
import { userReducer } from '../shared/slices/userSlice'
import { photoReducer } from '../shared/slices/photoSlice'
import { commentReducer } from '../shared/slices/commentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    photo: photoReducer,
    comment: commentReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
