import { BrowserRouter } from 'react-router-dom'

import { AppThemeProvider, AppReduxProvider } from './shared/contexts'
import { Navbar } from './shared/components'
import { AppRoutes } from './routes'
import CssBaseline from '@mui/material/CssBaseline'

export const App = () => {
  console.log(import.meta.env.VITE_API)
  return (
    <AppReduxProvider>
      <AppThemeProvider>
        <CssBaseline />
        <BrowserRouter>
          <Navbar>
            <AppRoutes />
          </Navbar>
        </BrowserRouter>
      </AppThemeProvider>
    </AppReduxProvider>
  )
}
