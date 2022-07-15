import { BrowserRouter } from "react-router-dom";

import { Navbar } from "./shared/components";
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Navbar>
          <AppRoutes />
        </Navbar>
      </BrowserRouter>
    </AppThemeProvider>
  );
};
