import { configureStore } from "@reduxjs/toolkit";
import { photoReducer, userReducer, authReducer } from "../shared/slices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    photo: photoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
