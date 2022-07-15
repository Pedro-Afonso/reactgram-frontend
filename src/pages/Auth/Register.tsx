import {
  Box,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  Card,
  Divider,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      confirmPassword,
    };
    console.log(user);
  };

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
                >
                  Confirme a senha
                </TextField>
              </Grid>
              <Grid>
                <Button type="submit" fullWidth variant="contained">
                  Cadastrar
                </Button>
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
