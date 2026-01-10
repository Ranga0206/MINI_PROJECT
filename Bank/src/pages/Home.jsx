import { ShieldCheck } from 'lucide-react'
import React, { useState } from 'react'
import { useBank } from "../context/BankContext"

const Home = () => {
    const { dispatch } = useBank();
    const [formData, setFormData] = useState({
        name: "",
        initialBalance: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.initialBalance) return;
        dispatch({
            type: "CREATE_ACCOUNT",
            payload: {
                name: formData.name,
                accountNumber: `ACC-${Math.floor(10000000 + Math.random() * 90000000)}`,
                initialBalance: parseFloat(formData.initialBalance)
            }
        })
    }

    return (
        <div className='min-h-screen bg-[#f8f9fc] flex flex-col items-center justify-center p-8 font-sans overflow-hidden py-24 '>
            <div className='max-w-lg w-full'>
                <div className='text-center mb-14'>
                    <div className='inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl shadow-xl shadow-indigo-100/20 mb-8 hover:scale-105 transition-transform border border-slate-50'>
                        <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center'>
                            <div className='w-4 h-4 bg-white rounded-full flex justify-center items-center'>
                                <div className='w-1.5 h-1.5 bg-indigo-600 rounded-sm'></div>
                            </div>
                        </div>
                    </div>
                    <h1 className='text-4xl font-bold text-slate-800 tracking-tight mb-3 uppercase'>Super Bank</h1>
                    <p className='text-slate-400 text-base font-semibold tracking-widest uppercase opacity-80'>Financial Protocol</p>
                </div>
                <div className='bg-white rounded-2xl p-10 lg:p-14 shadow-sm border border-white'>
                    <h2 className='text-xl font-bold mb-10 text-slate-800 border-b-2 border-slate-50 pb-5 uppercase tracking-tight'>Registration</h2>
                    <form className='space-y-7' onSubmit={handleSubmit}>
                        <div className='space-y-2.5'>
                            <label className='block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1'>Entity Name</label>
                            <input
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                value={formData.name} type="text" className='w-full bg-slate-50/50 border border-slate-100 rounded-lg px-6 py-4 text-[15px] text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-100 transition-all font-semibold placeholder:text-slate-300' placeholder='Ex. Shakir' required />
                        </div>
                        <div className='space-y-2.5'>
                            <label className='block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1'>Initial Reserve (₹)</label>
                            <input
                                onChange={(e) => setFormData({ ...formData, initialBalance: e.target.value })}
                                value={formData.initialBalance} type="number" className="w-full bg-slate-50/50 border border-slate-100 rounded-lg px-6 py-4 text-[15px] text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-100 transition-all font-semibold placeholder:text-slate-300"
                                placeholder="₹ 0" min="0" required />
                        </div>
                        <button className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4.5 rounded-lg transition-all duration-300 shadow-lg shadow-indigo-100 active:scale-[0.98] text-sm uppercase tracking-widest' type='submit'>
                            Complete Initialization
                        </button>
                    </form>

                </div>
                <div className='mt-14 text-center'>
                    <p className='text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2.5'>
                        <ShieldCheck size={16} className='text-indigo-600' />
                        End-to-End Secure
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Home