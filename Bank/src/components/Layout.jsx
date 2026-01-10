import { ArrowDownCircle, ArrowUpCircle, Bell, History, LayoutDashboard, LogOut, Search, Settings, Wallet } from 'lucide-react'
import React from 'react'
import { useBank } from '../context/BankContext'
import { Link } from 'react-router'

const SidebarItem = ({ item, active }) => {
    return (
        <Link className={`flex space-x-3.5 px-5 py-3 rounded-lg transition-all duration-300 ${active ? "bg-indigo-50 text-indigo-600" : "hover:bg-slate-50 text-slate-500 hover:text-slate-800"}`}>
            <div className={`p-1.5 rounded-md ${active ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-transparent transition-colors group-hover:bg-slate-100"}`}>{item.icon}</div>
            <span className={`font-semibold text-sm ${active ? "text-indigo-600" : "text-slate-500"}`}>{item.name}</span>
        </Link>
    )
}

const Layout = ({ children }) => {
    const { state, dispatch } = useBank();
    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "Transactions", path: "/transactions", icon: <History size={18} /> },
        { name: "Deposit", path: "/deposit", icon: <ArrowUpCircle size={18} /> },
        { name: "Withdraw", path: "/withdraw", icon: <ArrowDownCircle size={18} /> }

    ]
    return (
        <div className='min-h-screen bg-gray-50 text-slate-700 font-sans flex selection:bg-indigo-100 selection:text-indigo-900'>
            {/*sidebar*/}
            <aside className='w-64 bg-white border-[#eef0f7] border-r sticky top-0 h-screen py-8 flex flex-col'>
                {/* logo */}
                <div className='px-8 flex items-center space-x-3 mb-10'>
                    <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100'>
                        <div className='w-4.5 h-4.5 bg-white rounded-full flex items-center justify-center'>
                            <div className='w-2 h-2 bg-indigo-600 rounded-sm'></div>
                        </div>
                    </div>
                    <h1 className='text-lg font-bold tracking-tight text-slate-800'>Super Bank</h1>
                </div>
                <div className='px-4 mb-6'>
                    <p className='px-5 text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-4'>Nav</p>
                    <nav className='space-y-1'>
                        {navItems.map((item) => (
                            <SidebarItem key={item.path} item={item} active={location.pathname === item.path} />
                        ))}
                    </nav>
                </div>
                <div className='px-4 mt-auto'>
                    <div className='p-5 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden group'>
                        <div className='relative z-10 text-center'>
                            <div className='w-8 h-8 bg-white text-indigo-600 rounded-lg flex items-center justify-center mb-3 mx-auto shadow-sm border border-slate-100'>
                                <Settings size={16} />
                            </div>
                            <p className='text-xs font-bold text-slate-800 mb-1'>Support Hub</p>
                            <button className='w-full mt-2 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold outline-0
                            text-slate-700 hover:border-indigo-200 transition-all uppercase'>Get Help</button>
                        </div>
                    </div>
                </div>
                <div className='px-8 mt-6'>
                    <button onClick={() => dispatch({ type: "RESET" })} className='flex items-center gap-3 text-slate-400 hover:text-rose-500 transition-all font-bold text-[12px] uppercase tracking-tighter'>
                        <LogOut size={14} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
            {/* Main Content Area */}
            <div className='flex-1 flex flex-col min-w-0'>
                {/* Topbar */}
                <header className='h-20 bg-white border border-b border-[#eef0f7] px-8 flex items-center justify-between sticky top-0 z-20'>
                    <div className='relative max-w-sm w-full'>
                        <Search className='absolute left-4 top-1/2 -translate-y-1/2' size={16} />
                        <input className=' w-full bg-[#f8fafc] border border-slate-100 rounded-lg py-2 pl-12 pr-4 text-sm font-medium focus:outline-none focus:bg-white focus:border-indigo-100 transition-all placeholder:text-slate-300' type="text" placeholder='search' />
                    </div>
                    <div className='flex items-center space-x-6'>
                        <div className='flex items-center space-x-5 border-r border-slate-100 pr-6 text-slate-300'>
                            <Bell size={20} className='cursor-pointer hover:text-slate-600 transition-colors' />
                            <Wallet size={20} className='cursor-pointer hover:text-slate-600 transition-colors' />
                        </div>
                        <div className='flex items-center space-x-3'>
                            <div className='text-right'>
                                <p className='text-sm font-bold text-slate-800 leading-none'>{state.account?.name.split(" ")[0]}</p>
                                <p className='text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1'>Admin</p>
                            </div>
                        </div>
                        <div className='w-9 h-9 rounded-lg overflow-hidden border border-slate-100 shadow-sm'>
                            <img src={`https://ui-avatars.com/api/?name=${state.account?.name}&background=6366f1&color=fff&size=80&bold=true`} alt="user" />
                        </div>
                    </div>
                </header>
                {/* Dynamic Canvas */}
                <main className='flex-1 p-8 lg:p-10 overflow-y-auto'>
                    <div className='max-w-7xl mx-auto  transition-all duration-500'>{children}</div>
                </main>
            </div>
        </div>
    )
}

export default Layout