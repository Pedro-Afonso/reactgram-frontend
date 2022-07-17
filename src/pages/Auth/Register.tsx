import {
  Box,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { IUser } from "../../shared/interface";

// Redux
import { register, reset } from "../../shared/slices/authSlice";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { error, loading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: IUser = {
      name,
      email,
      password,
      confirmPassword,
    };
    console.log(user);
    dispatch(register(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <Box
      component="main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
    >
      <Box component={Paper} paddingX={4} paddingY={2}>
        <Box
          component="hgroup"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography marginY={2} variant="h1" fontSize="2rem" fontWeight={600}>
            ReactGram
          </Typography>
          <Typography marginY={1} variant="h2" fontSize="1rem" fontWeight={400}>
            Cadastre-se e compartilhe suas aventuras
          </Typography>
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
                  error={!!error?.match(/nome/g)}
                  helperText={error}
                >
                  Nome
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!error?.match(/e-mail/g)}
                  helperText={error}
                >
                  Email
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!error?.match(/\bsenha\b/g)}
                  helperText={error}
                >
                  Senha
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Confirme a senha"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!!error?.match(/\bsenhas\b/g)}
                  helperText={error}
                >
                  Confirme a senha
                </TextField>
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
        <Divider />
        <Typography textAlign="center" marginY={2}>
          Já tem conta?{" "}
          <Link component="button" onClick={() => navigate("/login")}>
            Clique aqui
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
