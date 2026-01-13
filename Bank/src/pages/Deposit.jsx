import { ArrowUpRight, CheckCircle2, ChevronLeft, Info } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useBank } from "../context/BankContext"
const Deposit = () => {
    const { dispatch } = useBank();
    const navigate = useNavigate();
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || amount <= 0) return;
        dispatch({
            type: "DEPOSIT", payload: {
                amount: parseFloat(amount),
                description: description || "Digital Deposit",

            }
        })

        navigate("/dashboard")
        setAmount("");
        setDescription("");
    }
    return (
        <div className='max-w-2xl mx-auto space-y-8 py-6'>
            <button onClick={() => navigate("/dashboard")} className='flex items-center cursor-pointer
        gap-2 text-slate-400 hover:text-indigo-600 transition-all font-bold uppercase tracking-widest text-[10px] group'>
                <ChevronLeft size={16} className='group-hover:-translate-x-1 transition-transform' />
                Back to Dashboard
            </button>

            <div className='flex items-center gap-6 mb-2 px-2'>
                <div className='w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm'>
                    <ArrowUpRight size={24} />
                </div>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight text-slate-800 uppercase'>Deposit</h2>
                    <p className='text-slate-400 font-bold uppercase tracking-widest text-[9px] mt-1 opacity-70'>Add funde to reserves</p>
                </div>
            </div>

            <div className='bg-white rounded-xl p-10 lg:p-14 shadow-sm border border-slate-100 relative overflow-hidden'>
                <form className='space-y-8 relative z-10' onSubmit={handleSubmit} >
                    <div className='space-y-4'>
                        <label className='block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1'>
                            Amount(₹)
                        </label>
                        <div className='relative group/input'>
                            <span className='absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 font-bold text-2xl group-focus-within/input:text-indigo-600 transition-colors'>₹</span>
                            <input type="number"
                                required
                                min="1"
                                step="1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className='w-full bg-slate-50/50 border border-slate-100 rounded-lg pl-16 pr-6 py-6 text-3xl text-slate-800 font-bold focus:outline-none focus:bg-white
                                focus:border-indigo-100
                                transition-all
                                placeholder:text-slate-100
                                tracking-tighter tabular-nums shadow-inner'
                                placeholder='0'
                            />
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <label className='block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1'>
                            Memo
                        </label>

                        <input type="text"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full bg-slate-50/50 border border-slate-100 rounded-lg pl-16 pr-6 py-6 text-3xl text-slate-800 font-bold focus:outline-none focus:bg-white
                                focus:border-indigo-100
                                transition-all
                                placeholder:text-slate-100
                                tracking-tighter tabular-nums shadow-inner'
                            placeholder='Ex. Salary, Dividend etc.'
                        />

                    </div>
                    <button type='submit'
                        className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-lg transition-all
                     duration-300 shadow-lg shadow-indigo-100 active:scale-[0.98] text-sm uppercase tracking-widest'
                    >Confirm</button>

                </form>
            </div>
            <div className="grid grid-cols-2 gap-6 px-2">
                <div className="p-5 bg-white border border-slate-100 rounded-xl flex items-center gap-4 group hover:bg-slate-50/50 transition-colors shadow-sm">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                        <Info size={18} />
                    </div>
                    <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">Protocol</p>
                        <p className="text-slate-800 font-bold text-[11px] uppercase tracking-tight">Instant</p>
                    </div>
                </div>
                <div className="p-5 bg-white border border-slate-100 rounded-xl flex items-center gap-4 group hover:bg-slate-50/50 transition-colors shadow-sm">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={18} />
                    </div>
                    <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">Fee Tier</p>
                        <p className="text-slate-800 font-bold text-[11px] uppercase tracking-tight">Zero</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Deposit