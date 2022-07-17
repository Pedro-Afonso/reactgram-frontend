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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, useAuth } from "../../hooks";

interface INavbarProps {
  children: React.ReactNode;
}

export const Navbar: React.FC<INavbarProps> = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { auth } = useAuth();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

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
              gap={1}
            >
              {auth ? (
                <>
                  <MenuItem onClick={() => navigate("/home")}>
                    <Icon>home</Icon>
                  </MenuItem>
                  {user && (
                    <MenuItem onClick={() => navigate(`/users/${user._id}`)}>
                      <Icon>camera_alt</Icon>
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => navigate("/profile")}>
                    <Icon>person</Icon>
                  </MenuItem>
                  <MenuItem>
                    <Typography>Sair</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => navigate("/login")}>
                    <Typography>Entrar</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/register")}>
                    <Typography>Cadastrar</Typography>
                  </MenuItem>
                </>
              )}
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
