import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Divider,
  Link,
  Avatar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { profile } from "../../shared/slices/userSlice";
import { IProfile, IUserState } from "../../shared/interface";
import { uploads } from "../../shared/utils";

export const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user) as { user: IProfile };

  // Load user data
  useEffect(() => {
    dispatch(profile(null));
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
    if (e.target.files) {
      const image =
        e.target.value && e.target.value.trim() !== ""
          ? e.target.files[0]
          : undefined;
      const url = URL.createObjectURL(e.target.files[0]);
      setPreviewImage(url);
      console.log(image);
      console.log(url);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
                  value={password}
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
                  //loading={loading}
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
        {/* <Divider />
        <Typography textAlign="center" marginY={2}>
          Já tem conta?{" "}
          <Link component="button" onClick={() => navigate("/login")}>
            Clique aqui
          </Link>
        </Typography> */}
      </Box>
    </Box>
  );
};
