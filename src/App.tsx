import { BrowserRouter } from "react-router-dom";

import { Navbar } from "./shared/components";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar>
        <AppRoutes />;
      </Navbar>
    </BrowserRouter>
  );
};
