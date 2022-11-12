import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  AppBar,
  Box,
  Icon,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  useTheme,
  MenuItem
} from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { logout, reset } from '../../slices/authSlice'

interface INavbarProps {
  children: React.ReactNode
}

export const Navbar: React.FC<INavbarProps> = ({ children }) => {
  const navigate = useNavigate()
  const theme = useTheme()

  const { user: userAuth } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (query) {
      return navigate(`/search?q=${query}`)
    }
  }

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
            <Box flex={2}>
              <form onSubmit={handleSearch}>
                <TextField
                  placeholder="Pesquisar..."
                  onChange={e => setQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>search</Icon>
                      </InputAdornment>
                    )
                  }}
                />
              </form>
            </Box>
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
