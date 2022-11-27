// material ui
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Typography, Paper, Link, Divider } from '@mui/material'

import { login, reset } from '../../shared/slices/authSlice'
import { useAppDispatch } from '../../shared/hooks'
import { ILoginForm } from '../../shared/interface'
import { LoginForm } from '../../shared/components'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogin = (data: ILoginForm) => {
    dispatch(login(data))
  }
  // Clean all auth states
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

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
            Entre com o seu login e senha
          </Typography>
        </Box>

        <LoginForm handleLogin={handleLogin} />
        <Divider />
        <Typography textAlign="center" marginY={2}>
          Não tem uma conta?{' '}
          <Link component="button" onClick={() => navigate('/register')}>
            Clique aqui
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
