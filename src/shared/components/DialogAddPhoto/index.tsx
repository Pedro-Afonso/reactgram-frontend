import { useState } from 'react'

import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'

import { useAppDispatch } from '../../hooks'
import { publishPhoto } from '../../slices/photoSlice'

export const DialogAddPhoto = () => {
  const [image, setImage] = useState<File | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')

  const dispatch = useAppDispatch()

  const canSubmit = !!image && !!title.trim()

  const toggleModal = () => {
    setIsOpen(prev => !prev)
  }

  // Stores the image file in the image state
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    setImage(file || null)
  }

  const handleSubmit = () => {
    if (!canSubmit) return

    const photoData = {
      title: title.trim(),
      image
    }

    // build form data
    const formData = new FormData()

    Object.entries(photoData).forEach(([key, value]) => {
      formData.append(key, value)
    })

    dispatch(publishPhoto(formData))

    toggleModal()
  }

  return (
    <>
      <Button variant="contained" onClick={toggleModal}>
        Carregar Foto
      </Button>
      <Dialog open={isOpen} onClose={toggleModal}>
        <DialogTitle align="center">{title}</DialogTitle>
        <DialogContent>
          {/* Preview image */}
          <Avatar
            variant="square"
            src={image ? URL.createObjectURL(image) : undefined}
            alt="Prévia da foto"
            sx={{
              width: '100%',
              height: '100%'
            }}
          />
        </DialogContent>
        <DialogActions>
          <IconButton
            size="large"
            aria-label="Carregar imagem"
            component="label"
          >
            <input hidden accept="image/*" type="file" onChange={handleFile} />
            <Icon>photo_camera</Icon>
          </IconButton>
          <TextField
            sx={{ marginRight: '0.5rem' }}
            fullWidth
            variant="outlined"
            color="secondary"
            label="Título para a foto:"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <Button
            type="submit"
            size="large"
            variant="contained"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            Enviar
          </Button>
          <Button onClick={toggleModal} size="large" variant="contained">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
