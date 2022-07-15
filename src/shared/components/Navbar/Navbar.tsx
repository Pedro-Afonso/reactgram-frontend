import {
  AppBar,
  Box,
  Button,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface INavbarProps {
  children: React.ReactNode;
}

export const Navbar: React.FC<INavbarProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Box flex={2}>
              <Typography variant="h6">ReactGram</Typography>
            </Box>
            <Box flex={2}>
              <TextField
                placeholder="Pesquisar..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon>search</Icon>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <IconButton>
                <Icon>home</Icon>
              </IconButton>
              <Button color="secondary" onClick={() => navigate("/login")}>
                Cadastrar
              </Button>
              <Button color="secondary" onClick={() => navigate("/register")}>
                Registrar
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};
