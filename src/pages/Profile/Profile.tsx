import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Divider,
  Grid,
  Icon,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { IPhoto, IProfile, IUserIdToken } from "../../shared/interface";
import {
  deletePhoto,
  getUserPhotos,
  publishPhoto,
  updatePhoto,
} from "../../shared/slices";
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
    user: IUserIdToken;
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

  const [editMode, setEditMode] = useState(false);
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editId, setEditId] = useState("");

  // Load user data
  useEffect(() => {
    console.log("HASSSSSSSSSSSSSSSS");
    if (id) {
      dispatch(getUserDetails(id));
      dispatch(getUserPhotos(id));
    }
  }, [id]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const url = file && URL.createObjectURL(file);
    setImage(file || "");
  };

  const handleEdit = (photo: IPhoto) => {
    setEditImage(photo.image);
    setEditId(photo._id);
    setEditMode(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updatePhoto({ title: editTitle, _id: editId }));

    setEditMode(false);
  };

  // Delete a photo
  const handleDelete = async (photoId: string) => {
    await dispatch(deletePhoto(photoId));
    if (id) {
      await dispatch(getUserPhotos(id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    await dispatch(publishPhoto(formData));
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
          {editMode ? (
            <form onSubmit={handleUpdate}>
              <Box marginBottom={4}>
                <Grid container direction="column" gap={3}>
                  <Grid item sm={12}>
                    {editImage && (
                      <img
                        width="600px"
                        src={`${uploads}/photos/${editImage}`}
                        alt={editTitle}
                      />
                    )}
                  </Grid>
                  <Grid item sm={12}>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Insira um novo título para a foto:"
                      type="text"
                      onChange={(e) => setEditTitle(e.target.value)}
                      //value={editTitle}
                      //error={!!error?.match(/nome/g)}
                      //helperText={error?.match(/nome/g) && error}
                    />
                  </Grid>

                  {/* <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="standard"
                      label="Imagem:"
                      type="file"
                      onChange={handleFile}
                      //error={!!error?.match(/\bsenha\b/g)}
                      //helperText={error?.match(/\bsenha\b/g) && error}
                    />
                  </Grid> */}

                  <Divider />
                  <Grid item sm={12}>
                    <LoadingButton
                      fullWidth
                      loading={loading}
                      type="submit"
                      variant="contained"
                    >
                      Atualizar
                    </LoadingButton>
                  </Grid>
                  <Grid item sm={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => setEditMode(false)}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          ) : (
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
          )}
        </Box>
        <Box>
          <Typography variant="h2" fontSize={16}>
            Fotos publicadas:
          </Typography>
          <Box maxWidth={800}>
            <ImageList cols={3}>
              {photos &&
                photos.map((photo) => (
                  <ImageListItem key={photo._id}>
                    {photo.image && (
                      <img
                        src={`${uploads}/photos/${photo.image}`}
                        alt={photo.title}
                      />
                    )}
                    {id === userAuth._id ? (
                      <ImageListItemBar
                        actionIcon={
                          <>
                            <IconButton>
                              <Icon>visibility</Icon>
                            </IconButton>
                            <IconButton onClick={() => handleEdit(photo)}>
                              <Icon>mode_edit</Icon>
                            </IconButton>
                            <IconButton onClick={() => handleDelete(photo._id)}>
                              <Icon>delete</Icon>
                            </IconButton>
                          </>
                        }
                      />
                    ) : (
                      <ImageListItemBar
                        actionIcon={
                          <IconButton>
                            <Icon>visibility</Icon>
                          </IconButton>
                        }
                      />
                    )}
                  </ImageListItem>
                ))}
            </ImageList>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
