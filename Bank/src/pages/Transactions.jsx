import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, Calendar, ChevronRight, Hash, Search, ShieldCheck } from 'lucide-react'
import React from 'react'
import { useBank } from '../context/BankContext'
import { Link } from 'react-router';

const Transactions = () => {
    const { state } = useBank();
    const { transactions } = state;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
        }).format(amount)
    }

    return (
        <div className='space-y-8'>
            <div className='flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 px-2 gap-6'>
                <div className='flex items-center gap-6'>
                    <div className='w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100'>
                        <ArrowLeftRight className='text-white' size={20} />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight text-slate-800 uppercase'>Ledger</h2>
                        <p className='text-slate-400 font-bold uppercase tracking-widest text-[9px] mt-1 opacity-70'>Activity registry</p>
                    </div>
                </div>
                <div className='px-5 py-2.5 bg-white border border-slate-100 rounded-lg font-bold text-slate-400 flex items-center gap-3 shadow-sm'>
                    <ShieldCheck size={16} className='text-indigo-600' />
                    <span className='uppercase tracking-widest text-[10px]'>{transactions.length} Records</span>
                </div>
            </div>
            <div className='bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm'>
                {transactions.length > 0 ? (<div className='overflow-x-auto'>
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            <tr className='bg-slate-50/50 border-b border-slate-50 text-slate-400'>
                                <th className='px-8 py-5 text-[12px] font-bold uppercase tracking-[0.2em]'>Date</th>
                                <th className='px-8 py-5 text-[12px] font-bold uppercase tracking-[0.2em]'>ID</th>
                                <th className='px-8 py-5 text-[12px] font-bold uppercase tracking-[0.2em]'>Description</th>
                                <th className='px-8 py-5 text-[12px] font-bold uppercase tracking-[0.2em]'>Category</th>
                                <th className='px-8 py-5 text-[12px] font-bold uppercase tracking-[0.2em]'>Magnitude</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx) => (<tr key={tx.id} className='hover:bg-slate-50/30 transition-all group border-b border-slate-50/50 last:border-0'>
                                <td className='px-8 py-5'>
                                    <div className='flex items-center gap-3'>
                                        <Calendar size={14} className='text-slate-200 group-hover:text-indigo-600 transition-colors' />
                                        <div >
                                            <p className='text-[14px] font-bold text-slate-700 tracking-tight tabular-nums uppercase'>{new Date(tx.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</p>
                                            <p className='text-[9px] font-bold text-slate-300 tracking-widest mt-0.5  uppercase'>{new Date(tx.date).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-8 py-5'>
                                    <span className='inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-md font-mono text-[9px] text-slate-400 group-hover:text-slate-700 group-hover:border-indigo-100 transition-all'>
                                        <Hash size={10} />
                                        {tx.id.toString().slice(-6)}</span>
                                </td>
                                <td className='px-8 py-5'>
                                    <span className='text-[14px] font-bold text-slate-600 uppercase tracking-tight group-hover:text-indigo-600 transition-colors'>{tx.description}</span>
                                </td>
                                <td className='px-8 py-5'>
                                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-[8px] font-bold uppercase tracking-widest border ${tx.type === "DEPOSIT" || tx.type === "INITIAL_DEPOSIT" ? "bg-indigo-50 text-indigo-500 border-indigo-50" : "bg-orange-50 text-orange-500 border-orange-50"}`}>
                                        {tx.type === "DEPOSIT" || tx.type === "INITIAL_DEPOSIT" ? <ArrowUpRight size={10} strokeWidth={2.5} />
                                            :
                                            <ArrowDownLeft size={10} strokeWidth={2.5} />
                                        }
                                        {tx.type.replace("_", " ")}
                                    </span>
                                </td>
                                <td className={`px-8 py-5 text-right font-bold text-lg tracking-tighter tabular-nums ${tx.type === "DEPOSIT" || tx.type === "INITIAL_DEPOSIT" ? "text-indigo-600" : "text-slate-800"
                                    }`}>
                                    {tx.type === "DEPOSIT" || tx.type === "INITIAL_DEPOSIT" ? "+" : "-"}
                                    {formatCurrency(tx.amount)}
                                </td>
                            </tr>))}
                        </tbody>
                    </table>

                </div>) : (<div className='p-24 text-center space-y-6'>
                    <div className='inline-flex w-20 h-20 bg-slate-50 rounded-xl border border-slate-100 items-center justify-center text-slate-100 shadow-inner'>
                        <Search size={40} strokeWidth={1} />
                    </div>
                    <p className='text-slate-300 font-bold uppercase tracking-[0.2em] text-[10px]'>Registry Empty</p>
                    <Link to="/deposit" className='inline-flex items-center gap-2 text-indigo-600 hover:scale-105 active:scale-95 font-bold text-[9px] uppercase tracking-widest border-b border-indigo-100 pb-1 transition-all'>Initiate <ChevronRight size={12} /></Link>

                </div>)}
            </div>
        </div>
    )
}

export default Transactions