import { AlertTriangle, ArrowDownLeft, ChevronLeft, ShieldCheck } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useBank } from "../context/BankContext"

const WithDraw = () => {
    const { state, dispatch } = useBank();
    const currentBalance = state.account.balance;

    const navigate = useNavigate()
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
        }).format(amount)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const WithdrawAmount = parseFloat(amount);
        if (!WithdrawAmount || WithdrawAmount <= 0) return;

        if (WithdrawAmount > currentBalance) {
            setError("Exceeds reserves");
            return;
        }
        dispatch({
            type: "WITHDRAW",
            payload: {
                amount: WithdrawAmount,
                description: description || "Cash Withdraw"
            }
        })
        navigate("/dashboard");
    }
    return (
        <div className='max-w-full mx-auto space-y-8 py-8'>
            <button onClick={() => navigate("/dashboard")} className='flex items-center gap-2 text-slate-400 hover:text-orange-600 transition-all font-bold uppercase tracking-widest text-[10px] group'>
                <ChevronLeft size={16}
                    className='group-hover:-translate-x-1 transition-transform'
                />
                Back to Dashboard
            </button>
            <div className='flex items-center gap-6 mb-2 px-2'>
                <div className='w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shadow-sm'>
                    <ArrowDownLeft size={24} />
                </div>
                <div >
                    <h2 className='text-2xl font-bold tracking-tight text-slate-800 uppercase'>Withdraw</h2>
                    <p className='text-slate-400 font-bold uppercase tracking-widest text-[9px] mt-1 opacity-70'>Extract from reserves</p>
                </div>
            </div>

            <div className='bg-white rounded-xl p-10 lg:p-14 shadow-sm border border-slate-100 relative overflow-hidden'>
                <div className='mb-8 p-6 bg-slate-50/50 border border-slate-100 rounded-lg flex items-center justify-between relative z-10'>
                    <div>
                        <p className='text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1 whitespace-nowrap'>Available</p>
                        <p className='text-2xl font-bold text-slate-800 tabular-nums tracking-tighter'>{formatCurrency(currentBalance)}</p>
                    </div>
                    <div className='w-10 h-10 rounded-lg flex items-center justify-center transition-all'>
                        <ShieldCheck size={28} />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='space-y-8 relative z-10'>
                    <div className='space-y-4'>
                        <label className='block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1'>Amount (₹)</label>
                        <div className='relative group/input'>
                            <span className='absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 font-bold text-2xl group-focus-within/input:text-orange-500 transition-colors'>₹</span>
                            <input type="number"
                                required
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value)
                                    setError("")
                                }}
                                max={currentBalance}
                                step="1"
                                className='w-full bg-slate-50/50 border rounded-lg pl-16 pr-6 py-6 text-3xl text-slate-800  font-bold focus:outline-none
                            focus:bg-white
                            focus:border-indigo-100 transition-all placeholder:text-slate-100 tracking-tighter tabular-nums shadow-inner'
                                placeholder='0'
                            />
                        </div>
                    </div>
                    {error && (<div className='flex items-center gap-3 text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-4 bg-rose-50/50 p-4 rounded-lg border border-rose-100 animate-in fade-in slide-in-from-top-1'>
                        <AlertTriangle size={14} />{error}
                    </div>)}
                    <div className='space-y-4'>
                        <label className='block text-[11px] uppercase tracking-widest ml-1' >Destination</label>
                        <input type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full bg-slate-50/50 border border-slate-100 rounded-lg px-6 py-4 text-[14px] text-slate-800 font-semibold focus:outline-none
                            focus:bg-white focus:border-indigo-100  transition-all placeholder:text-slate-200 shadow-inner'
                            placeholder='Ex. Operational Expenses, Rent, etc.'
                        />
                    </div>
                    <button type='submit'
                        className={`w-full ${currentBalance <= 0 ? "bg-slate-100 text-slate-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100"}
                        font-bold py-4.5 rounded-lg transition-all duration-300 active:scale-[0.98] text-sm flex items-center justify-center gap-2.5 uppercase tracking-widest
                        `}
                    >
                        {currentBalance <= 0 ? "Empty" : "Authorize Withdrawal"}
                    </button>

                </form>
            </div >
            <p className='text-center text-slate-300 text-[9px] font-bold uppercase tracking-[0.2em]'>Hub Protocol v2.4</p>
        </div >
    )
}

export default WithDraw