// material ui
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Link,
  Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// hooks
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// interface
import { IUser } from "../../shared/interface";

// redux
import { login, reset } from "../../shared/slices/authSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: IUser = {
      email,
      password,
    };

    dispatch(login(user));
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
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!error?.match(/e-mail/g)}
                  helperText={error?.match(/e-mail/g) && error}
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
                  helperText={error?.match(/\bsenha\b/g) && error}
                >
                  Senha
                </TextField>
              </Grid>

              <Grid>
                <LoadingButton
                  loading={loading}
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Entrar
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </form>
        <Divider />
        <Typography textAlign="center" marginY={2}>
          Não tem uma conta?{" "}
          <Link component="button" onClick={() => navigate("/register")}>
            Clique aqui
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
