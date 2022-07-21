import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { IProfile } from "../../shared/interface";
import { publishPhoto } from "../../shared/slices";
import { getUserDetails } from "../../shared/slices/userSlice";
import { uploads } from "../../shared/utils";

export const Profile = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user) as {
    user: IProfile;
    loading: boolean;
  };
  const { user: userAuth } = useAppSelector((state) => state.auth) as {
    user: IProfile;
  };
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useAppSelector((state) => state.photo);

  // New form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | string>("");

  // Load user data
  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id));
    }
  }, [id, dispatch]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const url = file && URL.createObjectURL(file);
    setImage(file || "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    // build form data
    const formData = new FormData();

    Object.entries(photoData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    dispatch(publishPhoto(formData));
    setTitle("");
  };

  return (
    <Box
      component="main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        component={Paper}
        paddingX={4}
        paddingY={2}
      >
        {user && (
          <Box display="flex" paddingY={2}>
            <Avatar
              sx={{ width: 128, height: 128 }}
              src={
                user.profileImage
                  ? `${uploads}/users/${user.profileImage}`
                  : undefined
              }
            />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              marginLeft={2}
              gap={1}
              height="auto"
            >
              <Typography variant="h5">{user.name}</Typography>
              <Typography>{user.bio}</Typography>
            </Box>
          </Box>
        )}
        <Box width="100%">
          <Divider />
          <Box marginY={3}>
            <Typography variant="h3" fontSize={18} textAlign="center">
              Compartilhe algum momento seu:
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box marginBottom={4}>
              <Grid container display="flex" direction="column" gap={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Título para a foto:"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    //error={!!error?.match(/nome/g)}
                    //helperText={error?.match(/nome/g) && error}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Imagem:"
                    type="file"
                    onChange={handleFile}
                    //error={!!error?.match(/\bsenha\b/g)}
                    //helperText={error?.match(/\bsenha\b/g) && error}
                  />
                </Grid>

                {/* <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Deseja alterar sua senha?"
                    placeholder="Digite sua nova senha"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    //error={!!error?.match(/\bsenhas\b/g)}
                    //helperText={error?.match(/\bsenhas\b/g) && error}
                  />
                </Grid> */}
                <Divider />
                <Grid>
                  <LoadingButton
                    loading={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    Postar
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
