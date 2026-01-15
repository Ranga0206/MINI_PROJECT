import { Feather, Home, PlusSquare, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import LogoutModel from './LogoutModel'

const NavItem = ({ to, icon: Icon, label }) => (
    <Link to={to} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium`}>
        <Icon size={20} />
        <span className='hidden sm:block'>{label}</span>
    </Link>)



const Navbar = () => {
    return (
        <nav className='sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    <Link to="/" className='flex gap-2 items-center'>
                        <div className='w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200/50'>
                            <Feather size={24} />
                        </div>
                        <span className='text-xl font-bold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>Blog App</span>
                    </Link>
                    <div className='flex items-center gap-1'>
                        <NavItem to="/" icon={Home} label="Home" />
                        <NavItem to="/add-post" icon={PlusSquare} label="Add Post" />
                        <NavItem to="/profile" icon={User} label="Profile" />
                        <LogoutModel />

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar