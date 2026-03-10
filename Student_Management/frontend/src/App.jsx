import React from 'react'
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import AddStudent from "./pages/AddStudent"
import EditStudent from "./pages/EditStudent"
import Reports from "./pages/Reports"
import { BrowserRouter, Route, Routes } from "react-router-dom"
const App = () => {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-slate-50'>
        <Navbar />
        <div className='container mx-auto'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/add' element={< AddStudent />} />
            <Route path='/edit/:id' element={<EditStudent />} />
            <Route path='/reports' element={<Reports />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App