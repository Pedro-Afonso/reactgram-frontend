import {
  Divider,
  Icon,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Typography,
  Button
} from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProfileHeader, UploadPhoto } from '../../shared/components'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { TPhoto } from '../../shared/interface'
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

  const { user } = useAppSelector(state => state.user)
  const { user: userAuth } = useAppSelector(state => state.auth)
  const { photos } = useAppSelector(state => state.photo)

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [image, setImage] = useState<File | string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const canEditDelete = id === userAuth!._id

  // Load user data
  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id))
      dispatch(getUserPhotos(id))
    }
  }, [id, dispatch])

  // clears the modal data when closing
  useEffect(() => {
    if (!editMode && !isModalOpen) {
      setTitle('')
      setImage(null)
    } else if (editMode && !isModalOpen) {
      setEditMode(false)
      setImage(null)
      setEditId('')
      setTitle('')
    }
  }, [editMode, isModalOpen])

  // Toggle isModalOpen
  const toggleModal = () => {
    setIsModalOpen(prev => !prev)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    setImage(file || null)
  }

  const handleEdit = (photo: TPhoto) => {
    setImage(photo.image)
    setEditId(photo._id)
    setTitle(photo.title)
    setEditMode(true)
    toggleModal()
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(updatePhoto({ title, id: editId }))

    toggleModal()
  }

  // Delete a photo
  const handleDelete = (photoId: string) => {
    dispatch(deletePhoto(photoId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!image) return

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

    toggleModal()
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

          {/* Open modal button */}
          <Box display="flex" justifyContent="center">
            <Button size="large" variant="contained" onClick={toggleModal}>
              Carregar Foto
            </Button>
          </Box>
          {/* /Open modal button */}

          <UploadPhoto
            dialogTitle={
              editMode ? 'Editar publicação' : 'Publicar uma nova foto'
            }
            editMode={editMode}
            title={title}
            setTitle={setTitle}
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            image={image}
            handleFile={handleFile}
            handleUpdate={handleUpdate}
            handleSubmit={handleSubmit}
            loading={false}
          />
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

                    <ImageListItemBar
                      actionIcon={
                        <>
                          <IconButton
                            onClick={() => navigate(`/photos/${photo._id}`)}
                          >
                            <Icon>visibility</Icon>
                          </IconButton>
                          {canEditDelete && (
                            <>
                              <IconButton onClick={() => handleEdit(photo)}>
                                <Icon>mode_edit</Icon>
                              </IconButton>
                              <IconButton
                                onClick={() => handleDelete(photo._id)}
                              >
                                <Icon>delete</Icon>
                              </IconButton>
                            </>
                          )}
                        </>
                      }
                    />
                  </ImageListItem>
                ))}
            </ImageList>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
