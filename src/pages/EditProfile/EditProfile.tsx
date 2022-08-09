import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Box, Typography, Grid, Paper, TextField, Avatar } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { profile, updateProfile } from "../../shared/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { IProfile } from "../../shared/interface";
import { uploads } from "../../shared/utils";

export const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | string>("");
  const [previewImage, setPreviewImage] = useState("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user) as {
    user: IProfile;
    loading: boolean;
  };
  // console.log(user);
  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio || "");
      setProfileImage(user.profileImage || "");
    }
  }, [user]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const url = file && URL.createObjectURL(file);
    setPreviewImage(url || "");
    setProfileImage(file || "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Gather user data from states
    const userData = {
      name,
      profileImage,
      bio: bio ? bio : "undefined",
      password: password ? password : undefined,
    };

    // Build form data
    const formData = new FormData();

    Object.entries(userData).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    /*     for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    } */

    await dispatch(updateProfile(formData));
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
        <Box
          component="hgroup"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography marginY={2} variant="h1" fontSize="2rem" fontWeight={600}>
            Edite seus dados
          </Typography>
          <Typography marginY={1} variant="h2" fontSize="1rem" fontWeight={400}>
            Adicione uma imagem no perfil e conte mais sobre você...
          </Typography>
        </Box>
        <Box paddingY={2}>
          <Avatar
            sx={{ width: 128, height: 128 }}
            src={
              previewImage
                ? previewImage
                : profileImage
                ? `${uploads}/users/${profileImage}`
                : undefined
            }
          />
        </Box>
        <form onSubmit={handleSubmit}>
          <Box marginBottom={4}>
            <Grid container display="flex" direction="column" gap={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Nome"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  //error={!!error?.match(/nome/g)}
                  //helperText={error?.match(/nome/g) && error}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  //error={!!error?.match(/e-mail/g)}
                  //helperText={error?.match(/e-mail/g) && error}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Imagem do perfil:"
                  type="file"
                  onChange={handleFile}
                  //error={!!error?.match(/\bsenha\b/g)}
                  //helperText={error?.match(/\bsenha\b/g) && error}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Bio:"
                  placeholder="Descrição do perfil"
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  //error={!!error?.match(/\bsenhas\b/g)}
                  //helperText={error?.match(/\bsenhas\b/g) && error}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid>
                <LoadingButton
                  loading={loading}
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Cadastrar
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
