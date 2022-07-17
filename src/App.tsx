import { BrowserRouter } from "react-router-dom";

import { AppThemeProvider, AppReduxProvider } from "./shared/contexts";
import { Navbar } from "./shared/components";
import { AppRoutes } from "./routes";

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
