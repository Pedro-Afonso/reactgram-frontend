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
export const profile = createAsyncThunk("user/profile", async (_, thunkAPI) => {
  const userIdToken: any = thunkAPI.getState();

  const res = await userService.profile(null, userIdToken.auth.user.token);

  return res;
});

export const updateProfile = createAsyncThunk(
  "user/update",
  async (data: FormData, thunkAPI) => {
    const userIdToken: any = thunkAPI.getState();

    const res = await userService.updateProfile(
      data,
      userIdToken.auth.user.token
    );

    // Check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }

    return thunkAPI.fulfillWithValue(res);
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
      )
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProfile.fulfilled.type,
        (state, action: PayloadAction<IProfile>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.user = action.payload;
          state.message = "Usuário atualizado com sucesso!";
        }
      )
      .addCase(
        updateProfile.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload ? action.payload : null;
          state.user = null;
        }
      );
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;