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
  useTheme,
  MenuItem,
  Menu,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface INavbarProps {
  children: React.ReactNode;
}

export const Navbar: React.FC<INavbarProps> = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height={theme.spacing(8)}
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
              <MenuItem onClick={() => navigate("/login")}>
                <Typography>Entrar</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/register")}>
                <Typography>Cadastrar</Typography>
              </MenuItem>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box height="100vh" marginTop={theme.spacing(8)}>
        {children}
      </Box>
    </>
  );
};
