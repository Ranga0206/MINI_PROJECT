import React from 'react'
import Dashboard from "./pages/Dashboard"
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster position='top-right' />
      <div className='min-h-screen p-4 md:p-10 bg-gray-100'>
        <header className='mb-12'>
          <h1 className='text-2xl font-semibold text-blue-500 uppercase tracking-wider text-center'>Financial Flow Tracker & Visualization Dashboard</h1>
        </header>
        <Dashboard />
      </div>

    </>

  )
}

export default App