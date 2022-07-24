import { Box, Paper } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LikeButton, PhotoItem } from "../../shared/components";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { IUserIdToken } from "../../shared/interface";
import { getAllPhotos, likePhoto } from "../../shared/slices";
import { api } from "../../shared/utils";

export const Home = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { photos, loading } = useAppSelector((state) => state.photo);

  const { user: authUser } = useAppSelector((state) => state.auth) as {
    user: IUserIdToken;
  };

  // Load photos
  useEffect(() => {
    dispatch(getAllPhotos());
  }, []);

  const handleLike = (photoId: string) => {
    dispatch(likePhoto(photoId));
  };

  return (
    <Box
      maxWidth={700}
      marginX="auto"
      marginTop={10}
      paddingY={2}
      //component={Paper}
    >
      {photos &&
        photos.map((photo, key) => (
          <Box key={key} marginBottom={2}>
            <PhotoItem photo={photo} linkControl />

            <LikeButton
              user={authUser}
              photo={photo}
              handleLike={() => handleLike(photo._id)}
            />
          </Box>
        ))}
    </Box>
  );
};
