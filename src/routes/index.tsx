import { Navigate, Route, Routes } from 'react-router-dom'
import {
  EditProfile,
  Home,
  Login,
  Photo,
  Register,
  Profile,
  Search
} from '../pages'
import { useAppSelector } from '../shared/hooks'

export const AppRoutes = () => {
  const authUser = useAppSelector(state => state.auth.authUser)

  return (
    <Routes>
      <Route
        path="/home"
        element={authUser ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!authUser ? <Login /> : <Navigate to="/home" />}
      />
      <Route
        path="/register"
        element={!authUser ? <Register /> : <Navigate to="/home" />}
      />
      <Route
        path="/profile"
        element={authUser ? <EditProfile /> : <Navigate to="/login" />}
      />
      <Route
        path="/users/:id"
        element={authUser ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/search"
        element={authUser ? <Search /> : <Navigate to="/login" />}
      />
      <Route
        path="/photos/:id"
        element={authUser ? <Photo /> : <Navigate to="/login" />}
      />
      <Route
        path="*"
        element={authUser ? <Home /> : <Navigate to="/login" />}
      />
    </Routes>
  )
}
