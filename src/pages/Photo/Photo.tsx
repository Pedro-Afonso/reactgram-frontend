import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PhotoItem } from "../../shared/components/PhotoItem/PhotoItem";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { getPhoto } from "../../shared/slices";

export const Photo = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { photo, loading, error, message } = useAppSelector(
    (state) => state.photo
  );

  // Load photo data
  useEffect(() => {
    if (id) {
      console.log(id);
      dispatch(getPhoto(id));
    }
    console.log(photo);
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <Box
      maxWidth={700}
      marginX="auto"
      marginTop={10}
      padding={2}
      component={Paper}
    >
      {photo && <PhotoItem photo={photo} />}
    </Box>
  );
};