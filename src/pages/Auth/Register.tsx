import { useNavigate } from 'react-router-dom'

import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'

import { useAppDispatch } from '../../shared/hooks'
import { register } from '../../shared/slices/authSlice'
import { IRegisterForm } from '../../shared/interface'
import { RegisterForm } from '../../shared/components'

export const Register = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleRegister = (data: IRegisterForm) => {
    dispatch(register(data))
  }

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
          minWidth="25rem"
        >
          <Typography marginY={1} variant="h1" fontSize="2rem" fontWeight={600}>
            ReactGram
          </Typography>
          <Typography
            marginBottom={2}
            variant="h2"
            fontSize="1rem"
            fontWeight={400}
          >
            Cadastre-se e compartilhe suas aventuras
          </Typography>
        </Box>

        <RegisterForm handleRegister={handleRegister} />
        <Divider />
        <Typography textAlign="center" marginY={2}>
          Já tem conta?{' '}
          <Link component="button" onClick={() => navigate('/login')}>
            Clique aqui
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
