import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUserAuth, IUserIdToken, IUserAuthState } from "../interface";
import { authService } from "../services/authService";

const localUser = localStorage.getItem("user");
const user: IUserIdToken = localUser ? JSON.parse(localUser) : null;

const initialState: IUserAuthState = {
  user: user ? user : null,
  error: null,
  success: false,
  loading: false,
};

// Register a user and sign in
export const register = createAsyncThunk(
  "auth/register",
  async (data: IUserAuth, thunkAPI) => {
    const res = await authService.register(data);

    // Check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }

    return thunkAPI.fulfillWithValue(res);
  }
);

// Logout a user
export const logout = createAsyncThunk("auth/logout", () => {
  authService.logout();
});

// Sign in a user
export const login = createAsyncThunk(
  "auth/login",
  async (user: Omit<IUserAuth, "name" | "confirmPassword">, thunkAPI) => {
    const res = await authService.login(user);

    // Check for errors
    if (res.errors) {
      console.log(res);
      return thunkAPI.rejectWithValue(res.errors[0]);
    }

    return thunkAPI.fulfillWithValue(res);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: IUserAuthState) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled.type,
        (state, action: PayloadAction<IUserIdToken>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.user = action.payload;
        }
      )
      .addCase(
        register.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload ? action.payload : null;
          state.user = null;
        }
      )
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled.type,
        (state, action: PayloadAction<IUserIdToken>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.user = action.payload;
        }
      )
      .addCase(login.rejected.type, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload ? action.payload : null;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
