import { BrowserRouter } from 'react-router-dom'

import { AppThemeProvider, AppReduxProvider } from './shared/contexts'
import { Navbar } from './shared/components'
import { AppRoutes } from './routes'
import CssBaseline from '@mui/material/CssBaseline'

export const App = () => {
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
