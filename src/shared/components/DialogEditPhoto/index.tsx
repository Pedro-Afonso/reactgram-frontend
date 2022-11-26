import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Icon from '@mui/material/Icon'

import { TPhoto } from '../../interface'
import { useState } from 'react'
import { Button, DialogActions, TextField } from '@mui/material'
import { useAppDispatch } from '../../hooks'
import { updatePhoto } from '../../slices/photoSlice'

interface IDialogEditPhotoProps {
  photo: TPhoto
}

export const DialogEditPhoto: React.FC<IDialogEditPhotoProps> = ({ photo }) => {
  const [title, setTitle] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useAppDispatch()

  const canSave = !title

  const toggleModal = () => {
    setIsOpen(prev => !prev)
  }

  const handleUpdate = () => {
    dispatch(updatePhoto({ title, id: photo._id }))
    toggleModal()
  }

  return (
    <>
      <IconButton onClick={toggleModal}>
        <Icon>mode_edit</Icon>
      </IconButton>
      <Dialog open={isOpen} onClose={toggleModal}>
        <DialogTitle align="center">{photo.title}</DialogTitle>
        <DialogContent>
          {/* Preview image */}
          <Avatar
            variant="square"
            src={photo.image}
            alt="Prévia da foto"
            sx={{
              width: '100%',
              height: '100%'
            }}
          />
        </DialogContent>
        <DialogActions>
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
            disabled={canSave}
            onClick={handleUpdate}
          >
            Salvar
          </Button>
          <Button onClick={toggleModal} size="large" variant="contained">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
