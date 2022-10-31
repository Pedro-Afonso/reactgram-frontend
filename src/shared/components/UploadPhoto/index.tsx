import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  TextField
} from '@mui/material'

interface IUploadPhotoProps {
  dialogTitle: string
  title: string
  setTitle: (value: string) => void
  loading: boolean
  isOpen: boolean
  image?: File | string | null
  toggleModal: () => void
  handleSubmit: (value: React.FormEvent) => void
  handleFile: (value: React.ChangeEvent<HTMLInputElement>) => void
  handleUpdate: (value: any) => void
  editMode: boolean
}

export const UploadPhoto: React.FC<IUploadPhotoProps> = ({
  dialogTitle,
  title,
  setTitle,
  isOpen,
  image,
  toggleModal,
  handleSubmit,
  handleFile,
  handleUpdate,
  editMode = false
}) => {
  return (
    <>
      {/* Modal */}
      <Dialog open={isOpen} onClose={toggleModal}>
        <DialogTitle align="center">{dialogTitle}</DialogTitle>
        <DialogContent>
          {/* Preview image */}
          <Avatar
            variant="square"
            src={
              image instanceof File
                ? URL.createObjectURL(image)
                : typeof image === 'string'
                ? image
                : undefined
            }
            alt="Prévia da foto"
            sx={{
              width: '100%',
              height: '100%'
            }}
          />
        </DialogContent>
        <form id="dialog_form" onSubmit={handleSubmit}>
          <DialogActions>
            {/*  Upload image button */}
            <IconButton
              size="large"
              aria-label="Carregar imagem"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleFile}
              />
              <Icon>photo_camera</Icon>
            </IconButton>
            {/*  /Upload image button */}

            {/* Title image */}
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
            {/* /Title image */}

            <Button
              type="submit"
              size="large"
              variant="contained"
              disabled={!image || !title}
              onClick={editMode ? handleUpdate : handleSubmit}
            >
              {editMode ? 'Salvar' : 'Enviar'}
            </Button>
            <Button onClick={toggleModal} size="large" variant="contained">
              Fechar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* /Modal */}
    </>
  )
}
