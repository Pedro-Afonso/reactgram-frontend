import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser, IUserAuth, IUserState } from "../interface";
import { authService } from "../services/authService";

const localUser = localStorage.getItem("user");
const user = localUser ? JSON.parse(localUser) : null;

const initialState: IUserState = {
  user: user ? user : null,
  error: null,
  success: false,
  loading: false,
};

interface MyKnownError {
  message: string;
}

// Register a user and sign in
export const register = createAsyncThunk<
  IUserAuth,
  IUser,
  {
    rejectValue: MyKnownError;
  }
>("auth/register", async (user, thunkAPI) => {
  const { user: userResponse, errors } = await authService.register(user);

  // Check for errors
  if (errors) {
    return thunkAPI.rejectWithValue({ message: errors[0] });
  }

  return userResponse;
});

// Logout a user
export const logout = createAsyncThunk("auth/logout", () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: IUserState) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : null;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
