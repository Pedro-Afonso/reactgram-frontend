import { IComment } from "./../interface/IPhoto";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IPhoto,
  IPhotoState,
  IPhotoMessageErrors,
  ILike,
  ICommentMessageErrors,
  IPhotoResponse,
  IMessage,
} from "../interface";
import { photoService } from "../services";

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

// Publish an user's photo
export const getUserPhotos = createAsyncThunk(
  "photo/userphotos",
  async (id: string, thunkAPI) => {
    const userIdToken: any = thunkAPI.getState();

    const res = await photoService.getUserPhotos(
      id,
      userIdToken.auth.user.token
    );

    // Check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }

    return thunkAPI.fulfillWithValue(res);
  }
);

export const deletePhoto = createAsyncThunk(
  "photo/delete",
  async (id: string, thunkAPI) => {
    const userIdToken: any = thunkAPI.getState();

    const res = await photoService.deletePhoto(id, userIdToken.auth.user.token);

    // Check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }

    return thunkAPI.fulfillWithValue(res);
  }
);

export const updatePhoto = createAsyncThunk(
  "photo/update",
  async (photo: { title: string; _id: string }, thunkAPI) => {
    const userIdToken: any = thunkAPI.getState();

    const res = await photoService.updatePhoto(
      photo.title,
      photo._id,
      userIdToken.auth.user.token
    );

    // Check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }

    return thunkAPI.fulfillWithValue(res);
  }
);

export const getPhoto = createAsyncThunk(
  "photo/getphoto",
  async (id: string, thunkAPI) => {
    const res = await photoService.getPhoto(id);

    // Check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }

    return thunkAPI.fulfillWithValue(res);
  }
);

export const likePhoto = createAsyncThunk(
  "photo/likephoto",
  async (id: string, thunkAPI) => {
    const userIdToken: any = thunkAPI.getState();

    const res = await photoService.likePhoto(id, userIdToken.auth.user.token);

    // Check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }

    return thunkAPI.fulfillWithValue(res);
  }
);

export const commentPhoto = createAsyncThunk(
  "photo/commentphoto",
  async (commentData: { comment: string; id: string }, thunkAPI) => {
    const userIdToken: any = thunkAPI.getState();

    const res = await photoService.commentPhoto(
      commentData.id,
      { comment: commentData.comment },
      userIdToken.auth.user.token
    );

    // Check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }

    return thunkAPI.fulfillWithValue(res);
  }
);

export const getAllPhotos = createAsyncThunk(
  "photo/getallphotos",
  async (_, thunkAPI) => {
    const userIdToken: any = thunkAPI.getState();

    const res = await photoService.getAllPhotos(userIdToken.auth.user.token);

    return thunkAPI.fulfillWithValue(res);
  }
);

export const searchPhotos = createAsyncThunk(
  "photo/searchphotos",
  async (query: string, thunkAPI) => {
    const userIdToken: any = thunkAPI.getState();

    const res = await photoService.searchPhotos(
      query,
      userIdToken.auth.user.token
    );

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
      )
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserPhotos.fulfilled.type,
        (state, action: PayloadAction<IPhoto[]>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.photos = action.payload;
        }
      )
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deletePhoto.fulfilled.type,
        (state, action: PayloadAction<IPhotoResponse>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.photos = state.photos.filter((photo) => {
            return photo._id !== action.payload._id;
          });
          state.message = action.payload.message;
        }
      )
      .addCase(
        deletePhoto.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload;
          state.photo = null;
        }
      )
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updatePhoto.fulfilled.type,
        (state, action: PayloadAction<{ photo: IPhoto; message: string }>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.photos.map((photo) => {
            if (photo._id === action.payload.photo._id) {
              return (photo.title = action.payload.photo.title);
            }
            return photo;
          });
          state.message = action.payload.message;
        }
      )
      .addCase(
        updatePhoto.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload;
          state.photo = null;
        }
      )
      .addCase(getPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPhoto.fulfilled.type,
        (state, action: PayloadAction<IPhoto>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.photo = action.payload;
        }
      )
      .addCase(likePhoto.rejected, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        likePhoto.fulfilled.type,
        (state, action: PayloadAction<ILike>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          if (state.photo?.likes) {
            state.photo.likes.push(action.payload.userId);
          }

          state.photos.map((photo) => {
            if (photo._id === action.payload.photoId) {
              return photo.likes.push(action.payload.userId);
            }
            return photo;
          });

          state.message = action.payload.message;
        }
      )
      .addCase(commentPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        commentPhoto.fulfilled.type,
        (
          state,
          action: PayloadAction<
            IComment & { message: string; errors: string[] }
          >
        ) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.photo &&
            state.photo.comments.push({ ...action.payload.comment, _id: "" });
          state.message = action.payload.message;
        }
      )
      .addCase(
        commentPhoto.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload;
          state.photo = null;
        }
      )
      .addCase(getAllPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllPhotos.fulfilled.type,
        (state, action: PayloadAction<IPhoto[]>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.photos = action.payload;
        }
      )
      .addCase(searchPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchPhotos.fulfilled.type,
        (state, action: PayloadAction<IPhoto[]>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.photos = action.payload;
        }
      );
  },
});

export const { resetMessage } = photoSlice.actions;
export const { reducer: photoReducer } = photoSlice;
