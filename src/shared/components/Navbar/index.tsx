import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useMediaQuery, useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import AppBar from '@mui/material/AppBar'
import Menu from '@mui/material/Menu'
import Icon from '@mui/material/Icon'
import Box from '@mui/material/Box'

import { reset as resetProfile } from '../../slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { logout, reset } from '../../slices/authSlice'
import { SearchBar } from '../SearchBar'

interface INavbarProps {
  children: React.ReactNode
}

export const Navbar: React.FC<INavbarProps> = ({ children }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  const userAuth = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    handleCloseUserMenu()
    dispatch(resetProfile())
    dispatch(logout())
    dispatch(reset())

    navigate('/login')
  }

  const user = useAppSelector(state => state.user.user)

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleHome = () => {
    handleCloseUserMenu()
    navigate('/home')
  }
  const handleProfile = () => {
    handleCloseUserMenu()
    navigate('/profile')
  }
  const handleGallery = () => {
    handleCloseUserMenu()
    if (!userAuth) return
    navigate(`/users/${userAuth._id}`)
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
            {userAuth ? <SearchBar /> : null}
            <Box
              display="flex"
              alignItems="center"
              justifyContent={upMd ? 'space-between' : 'end'}
              flex={1}
              gap={1}
            >
              {userAuth ? (
                <>
                  {!upMd ? (
                    <>
                      <Tooltip title="Mais Opções">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt={user?.name} />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left'
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left'
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem onClick={handleHome}>
                          <Icon>home</Icon>
                        </MenuItem>
                        <MenuItem onClick={handleGallery}>
                          <Icon>camera_alt</Icon>
                        </MenuItem>

                        <MenuItem onClick={handleProfile}>
                          <Icon>person</Icon>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          <Typography>Sair</Typography>
                        </MenuItem>
                      </Menu>
                    </>
                  ) : null}
                  {upMd ? (
                    <>
                      <MenuItem onClick={() => navigate('/home')}>
                        <Icon>home</Icon>
                      </MenuItem>
                      <MenuItem
                        onClick={() => navigate(`/users/${userAuth._id}`)}
                      >
                        <Icon>camera_alt</Icon>
                      </MenuItem>

                      <MenuItem onClick={() => navigate('/profile')}>
                        <Icon>person</Icon>
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <Typography>Sair</Typography>
                      </MenuItem>
                    </>
                  ) : null}
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
