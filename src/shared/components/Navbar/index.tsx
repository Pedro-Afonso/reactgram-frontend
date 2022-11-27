import { useNavigate } from 'react-router-dom'

import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import { useTheme } from '@mui/material'
import Icon from '@mui/material/Icon'
import Box from '@mui/material/Box'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { logout, reset } from '../../slices/authSlice'
import { SearchBar } from '../SearchBar'

interface INavbarProps {
  children: React.ReactNode
}

export const Navbar: React.FC<INavbarProps> = ({ children }) => {
  const navigate = useNavigate()
  const theme = useTheme()

  const userAuth = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())

    navigate('/login')
  }

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
            <SearchBar />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
              gap={1}
            >
              {userAuth ? (
                <>
                  <MenuItem onClick={() => navigate('/home')}>
                    <Icon>home</Icon>
                  </MenuItem>
                  <MenuItem onClick={() => navigate(`/users/${userAuth._id}`)}>
                    <Icon>camera_alt</Icon>
                  </MenuItem>

                  <MenuItem onClick={() => navigate('/profile')}>
                    <Icon>person</Icon>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography>Sair</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => navigate('/login')}>
                    <Typography>Entrar</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/register')}>
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
  )
}
