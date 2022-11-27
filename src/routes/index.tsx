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
  const auth = useAppSelector(state => state.auth.user)

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
      <Route
        path="/users/:id"
        element={auth ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/search"
        element={auth ? <Search /> : <Navigate to="/login" />}
      />
      <Route
        path="/photos/:id"
        element={auth ? <Photo /> : <Navigate to="/login" />}
      />
      <Route path="*" element={auth ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  )
}
