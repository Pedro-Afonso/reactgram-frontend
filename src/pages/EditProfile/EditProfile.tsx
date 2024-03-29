import { useEffect, useState } from 'react'

import {
  Box,
  Typography,
  Paper,
  TextField,
  Avatar,
  Backdrop,
  CircularProgress
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { updateProfile } from '../../shared/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'

export const EditProfile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [password, setPassword] = useState('')
  const [profileImage, setProfileImage] = useState<File | string>('')
  const [previewImage, setPreviewImage] = useState('')

  const dispatch = useAppDispatch()
  const {
    authUser,
    loading: loadingUser,
    error
  } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (authUser) {
      setName(authUser.name)
      setEmail('email' in authUser ? authUser.email : '')
      setBio(authUser.bio || '')
      setPreviewImage(authUser.profileImage || '')
    }
  }, [authUser])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    const url = file && URL.createObjectURL(file)
    setPreviewImage(url || '')
    setProfileImage(file || '')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Gather user data from states
    const userData = {
      name,
      profileImage,
      bio: bio || 'undefined',
      password: password || undefined
    }

    // Build form data
    const formData = new FormData()

    Object.entries(userData).forEach(([key, value]) => {
      if (value) formData.append(key, value)
    })

    await dispatch(updateProfile(formData))
  }

  return (
    <Box
      component="main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        component={Paper}
        paddingX={4}
        paddingY={2}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography marginY={2} variant="h1" fontSize="2rem" fontWeight={600}>
            Edite seus dados
          </Typography>
          <Typography marginY={1} variant="h2" fontSize="1rem" fontWeight={400}>
            Adicione uma imagem no perfil e conte mais sobre você...
          </Typography>
        </Box>
        <Box paddingY={2}>
          <Avatar
            sx={{ width: 128, height: 128 }}
            src={previewImage || undefined}
          />
        </Box>
        <form onSubmit={handleSubmit}>
          <Box marginBottom={4} display="flex" flexDirection="column" gap={3}>
            <TextField
              fullWidth
              variant="standard"
              label="Nome"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              error={!!error?.match(/nome/g)}
              helperText={error?.match(/nome/g) && error}
            />
            <TextField
              fullWidth
              variant="standard"
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={!!error?.match(/e-mail/g)}
              helperText={error?.match(/e-mail/g) && error}
            />
            <TextField
              fullWidth
              variant="standard"
              label="Imagem do perfil:"
              type="file"
              onChange={handleFile}
              error={!!error?.match(/imagem\b/g)}
              helperText={error?.match(/imagem\b/g) && error}
            />
            <TextField
              fullWidth
              variant="standard"
              label="Bio:"
              placeholder="Descrição do perfil"
              type="text"
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
            <TextField
              fullWidth
              variant="standard"
              label="Deseja alterar sua senha?"
              placeholder="Digite sua nova senha"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={!!error?.match(/\bsenha\b/g)}
              helperText={error?.match(/\bsenha\b/g) && error}
            />
            <Box>
              <LoadingButton
                loading={loadingUser}
                type="submit"
                fullWidth
                variant="contained"
              >
                Salvar
              </LoadingButton>
            </Box>
          </Box>
        </form>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.modal + 1 }}
        open={loadingUser}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}
