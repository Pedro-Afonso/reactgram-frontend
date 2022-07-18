import { Box, CircularProgress } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { EditProfile, Home, Login, Register } from "../pages";
import { useAuth } from "../shared/hooks";

export const AppRoutes = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />;
      </Box>
    );
  }

  return (
    <Routes>
      <Route
        path="/home"
        element={auth ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!auth ? <Login /> : <Navigate to="/home" />}
      />
      <Route
        path="/register"
        element={!auth ? <Register /> : <Navigate to="/home" />}
      />
      <Route
        path="/profile"
        element={auth ? <EditProfile /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};
