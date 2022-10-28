import { LoadingButton } from '@mui/lab'
import {
  Divider,
  Grid,
  Icon,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  TextField,
  Typography,
  Button
} from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProfileHeader } from '../../shared/components'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { IPhoto } from '../../shared/interface'
import {
  deletePhoto,
  getUserPhotos,
  publishPhoto,
  updatePhoto
} from '../../shared/slices/photoSlice'
import { getUserDetails } from '../../shared/slices/userSlice'

export const Profile = () => {
  const { id } = useParams()

  const dispatch = useAppDispatch()
  const { user, loading } = useAppSelector(state => state.user)
  const { user: userAuth } = useAppSelector(state => state.auth)
  const { photos } = useAppSelector(state => state.photo)

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [image, setImage] = useState<File | string>('')

  const [editMode, setEditMode] = useState(false)
  const [editImage, setEditImage] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editId, setEditId] = useState('')

  // Load user data
  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id))
      dispatch(getUserPhotos(id))
    }
  }, [id, dispatch])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    setImage(file || '')
  }

  const handleEdit = (photo: IPhoto) => {
    setEditImage(photo.image)
    setEditId(photo._id)
    setEditMode(true)
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(updatePhoto({ title: editTitle, _id: editId }))

    setEditMode(false)
  }

  // Delete a photo
  const handleDelete = async (photoId: string) => {
    await dispatch(deletePhoto(photoId))
    if (id) {
      await dispatch(getUserPhotos(id))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const photoData = {
      title,
      image
    }

    // build form data
    const formData = new FormData()

    Object.entries(photoData).forEach(([key, value]) => {
      formData.append(key, value)
    })

    await dispatch(publishPhoto(formData))
    setTitle('')
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
        {user && <ProfileHeader user={user} />}
        <Box width="100%">
          <Divider />
          <Box marginY={3}>
            <Typography variant="h3" fontSize={18} textAlign="center">
              Compartilhe algum momento seu:
            </Typography>
          </Box>
          {editMode ? (
            <form onSubmit={handleUpdate}>
              <Box marginBottom={4}>
                <Box flexDirection="column" gap={3}>
                  <Box>
                    {editImage && (
                      <img width="600px" src={editImage} alt={editTitle} />
                    )}
                  </Box>
                  <Box>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Insira um novo título para a foto:"
                      type="text"
                      onChange={e => setEditTitle(e.target.value)}
                    />
                  </Box>
                  <Divider />
                  <Box>
                    <LoadingButton
                      fullWidth
                      loading={loading}
                      type="submit"
                      variant="contained"
                    >
                      Atualizar
                    </LoadingButton>
                  </Box>
                  <Box>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => setEditMode(false)}
                    >
                      Cancelar
                    </Button>
                  </Box>
                </Box>
              </Box>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <Box marginBottom={4}>
                <Grid container display="flex" direction="column" gap={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="standard"
                      label="Título para a foto:"
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button variant="contained" component="label">
                      Upload
                      <input
                        hidden
                        onChange={handleFile}
                        accept="image/*"
                        type="file"
                      />
                    </Button>
                    {/* <TextField
                      fullWidth
                      variant="standard"
                      label="Imagem:"
                      type="file"
                      onChange={handleFile}
                    /> */}
                  </Grid>

                  {/* <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Deseja alterar sua senha?"
                    placeholder="Digite sua nova senha"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    //error={!!error?.match(/\bsenhas\b/g)}
                    //helperText={error?.match(/\bsenhas\b/g) && error}
                  />
                </Grid> */}
                  <Divider />
                  <Grid>
                    <LoadingButton
                      loading={loading}
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Postar
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Box>
            </form>
          )}
        </Box>
        <Box>
          <Typography variant="h2" fontSize={16}>
            Fotos publicadas:
          </Typography>
          <Box maxWidth={800}>
            <ImageList cols={3}>
              {photos &&
                photos.map(photo => (
                  <ImageListItem key={photo._id}>
                    {photo.image && <img src={photo.image} alt={photo.title} />}
                    {id === userAuth!._id ? (
                      <ImageListItemBar
                        actionIcon={
                          <>
                            <IconButton
                              onClick={() => navigate(`/photos/${photo._id}`)}
                            >
                              <Icon>visibility</Icon>
                            </IconButton>
                            <IconButton onClick={() => handleEdit(photo)}>
                              <Icon>mode_edit</Icon>
                            </IconButton>
                            <IconButton onClick={() => handleDelete(photo._id)}>
                              <Icon>delete</Icon>
                            </IconButton>
                          </>
                        }
                      />
                    ) : (
                      <ImageListItemBar
                        actionIcon={
                          <IconButton>
                            <Icon>visibility</Icon>
                          </IconButton>
                        }
                      />
                    )}
                  </ImageListItem>
                ))}
            </ImageList>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
