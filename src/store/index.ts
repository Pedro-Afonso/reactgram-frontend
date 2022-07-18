import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../shared/slices/authSlice";
import userReducer from "../shared/slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
