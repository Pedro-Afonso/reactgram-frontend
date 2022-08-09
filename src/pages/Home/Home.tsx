import { useEffect } from "react";

import { Box } from "@mui/material";

import { getAllPhotos, likePhoto } from "../../shared/slices/photoSlice";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { LikeButton, PhotoItem } from "../../shared/components";

export const Home = () => {
  const dispatch = useAppDispatch();

  const { photos, loading } = useAppSelector((state) => state.photo);
  const { user: authUser } = useAppSelector((state) => state.auth);

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
