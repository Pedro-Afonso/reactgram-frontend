import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPhoto } from "../interface";
import { photoService } from "../services";

interface IPhotoState {
  photos: IPhoto[];
  photo: IPhoto | null;
  error: string | null;
  success: boolean;
  loading: boolean;
  message?: string | null;
}

const initialState: IPhotoState = {
  photos: [],
  photo: null,
  error: null,
  success: false,
  loading: false,
  message: null,
};

// Publish an user's photo
export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo: FormData, thunkAPI) => {
    const userIdToken: any = thunkAPI.getState();

    const res = await photoService.publishPhoto(
      photo,
      userIdToken.auth.user.token
    );

    // Check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }

    return thunkAPI.fulfillWithValue(res);
  }
);

export const photoSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    resetMessage: (state: IPhotoState) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        publishPhoto.fulfilled.type,
        (state, action: PayloadAction<IPhoto>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.photo = action.payload;
          state.photos.unshift(state.photo);
          state.message = "Foto publicada com sucesso!";
        }
      )
      .addCase(
        publishPhoto.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload;
          state.photo = null;
        }
      );
  },
});

export const { resetMessage } = photoSlice.actions;
export const { reducer: photoReducer } = photoSlice;
