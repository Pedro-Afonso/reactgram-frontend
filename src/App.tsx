import { BrowserRouter } from "react-router-dom";

import { Navbar } from "./shared/components";
import { AppRoutes } from "./routes";
import { AppThemeProvider, AppReduxProvider } from "./shared/contexts";

export const App = () => {
  return (
    <AppReduxProvider>
      <AppThemeProvider>
        <BrowserRouter>
          <Navbar>
            <AppRoutes />
          </Navbar>
        </BrowserRouter>
      </AppThemeProvider>
    </AppReduxProvider>
  );
};
