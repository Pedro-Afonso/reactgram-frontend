import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

import { useAppSelector } from '../../hooks'

export const BackdropAuth = () => {
  const authLoading = useAppSelector(state => state.auth.loading)
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
      open={authLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
