import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import AddPost from "./pages/AddPost"
import NotFound from "./pages/NotFound"
import PublicRoutes from './routes/PublicRoutes'
import ProtctedRoutes from './routes/ProtctedRoutes'
import AuthProvider from './context/AuthContext'

const router = createBrowserRouter([
  {
    path: "/", element: <ProtctedRoutes>
      <Home />
    </ProtctedRoutes>
  },
  {
    path: "/register", element:
      <PublicRoutes>
        <Register />
      </PublicRoutes>
  },
  {
    path: "/login", element: <PublicRoutes>
      <Login />
    </PublicRoutes>
  },
  {
    path: "/profile", element:
      <ProtctedRoutes>
        <Profile />
      </ProtctedRoutes>
  },
  {
    path: "/add-post", element:

      <ProtctedRoutes>
        <AddPost />
      </ProtctedRoutes>
  },
  { path: "*", element: <NotFound /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
