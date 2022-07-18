import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProfile, IUserIdToken, IUserState } from "../interface";
import { userService } from "../services/userService";
import { reset } from "./authSlice";

const initialState: IUserState = {
  user: null,
  error: null,
  success: false,
  loading: false,
  message: null,
};

// Get user details, for edit data
export const profile = createAsyncThunk(
  "user/profile",
  async (data: FormData | null, thunkAPI) => {
    const token: any = thunkAPI.getState();

    const res = await userService.profile(data, token.auth.user.token);

    return res;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state: IUserState) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        profile.fulfilled.type,
        (state, action: PayloadAction<IProfile>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.user = action.payload;
        }
      );
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
