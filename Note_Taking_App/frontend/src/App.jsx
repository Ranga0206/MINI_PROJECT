import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./App.css";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
const App = () => {
  const { user, loading } = useContext(AuthContext);

  console.log(user);
  if (loading) {
    return <div>Loading....</div>
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>} />
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        } />

        <Route path="*" />

      </Routes>
    </BrowserRouter>
  )
}

export default App