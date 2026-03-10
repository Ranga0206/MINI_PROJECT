import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white p-4 shadow-md flex justify-between items-center'>
            <h1 className='text-xl font-bold tracking-wide'>Student Management</h1>
            <div className='space-x-6'>
                <Link className='hover:text-yellow-400' to="/">Dashboard</Link>
                <Link className='hover:text-yellow-400' to="/add">AddStudent</Link>
                <Link className='hover:text-yellow-400' to="/reports">Reports</Link>

            </div>
        </nav>
    )
}

export default Navbar