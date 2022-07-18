import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserAuth, IUserState } from "../interface";
import { authService } from "../services/authService";

const localUser = localStorage.getItem("user");
const user: IUserAuth = localUser ? JSON.parse(localUser) : null;

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
export const register = createAsyncThunk(
  "auth/register",
  async (data: IUser, thunkAPI) => {
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
  async (user: Omit<IUser, "name" | "confirmPassword">, thunkAPI) => {
    const res = await authService.login(user);

    // Check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }

    return thunkAPI.fulfillWithValue(res);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: IUserState) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      register.fulfilled.type,
      (state, action: PayloadAction<IUserAuth>) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      }
    );
    builder.addCase(
      register.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload ? action.payload : null;
        state.user = null;
      }
    );
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.user = null;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      login.fulfilled.type,
      (state, action: PayloadAction<IUserAuth>) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      }
    );
    builder.addCase(
      login.rejected.type,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload ? action.payload : null;
        state.user = null;
      }
    );
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
