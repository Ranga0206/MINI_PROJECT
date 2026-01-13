import React from 'react'
import { useBank } from "../context/BankContext"
import { ArrowDownLeft, ArrowUpRight, ChevronRight, CreditCard, Minus, Plus, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';



const StatCard = ({ title, amount, gradient, icon: Icon, currency, percentage, secondaryLabel }) => (
    <div className={`p-8 rounded-2xl shadow-sm relative overflow-hidden text-white ${gradient}`}>
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <p className="text-sm font-semibold opacity-90 tracking-tight">{title}</p>
                <div className="px-3 py-1 bg-white/20 rounded-md text-[10px] font-bold backdrop-blur-md uppercase">{percentage ? percentage : "Active"}</div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 flex items-baseline gap-2">
                <span className="text-base opacity-60 font-medium">{currency}</span> {amount}
            </h3>
            {secondaryLabel && (
                <div className="flex items-center space-x-2.5 mt-2">
                    <div className="w-8 h-8 rounded-md bg-white/20 flex items-center justify-center backdrop-blur-md shadow-sm">
                        <TrendingUp size={14} />
                    </div>
                    <p className="text-xs font-semibold opacity-90">{secondaryLabel}</p>
                </div>
            )}
        </div>
        <div className="absolute top-[-10%] right-[-5%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
    </div>
);

const Dashboard = () => {
    const { state } = useBank();
    const { account, transactions } = state;

    const recentTransactions = transactions.slice(0, 10);

    const formatAmount = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
        }).format(amount);
    }


    return (
        <div className='space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8'>
                <StatCard title="Active Reserves" amount={formatAmount(account.balance)} currency="₹"
                    gradient="bg-gradient-to-br-from-[#808af0] to-[#6366f1]"
                    secondaryLabel="Liquid capital"
                />
                <StatCard title="Growth Velocity" amount="6.12%" currency="" gradient="bg-gradient-to-br from-[#f8a5c2] to-[#ff9f91]"
                    secondaryLabel="Market performance"
                    percentage="+6.12%" />
                <div className='p-8 rounded-2xl shadow-sm bg-linear-to-br from-[#c1f4c1] to-[#98d898]relative overflow-hidden text-[#225024] flex flex-col min-h-/[180px]/ justify-between '>
                    <div className='relative z-10'>
                        <div className='flex justify-between items-center mb-6'>
                            <CreditCard size={24} className='opacity-60' />
                            <p className='font-mono text-[10px] font-bold opacity-30 uppercase'>Sovereign Card</p>
                        </div>
                        <p className='text-xl font-mono font-bold tracking-[0.2em] mb-4 text-[#225024]/80 text-center'>3829 4820 4629 5025</p>
                        <div className='flex justify-between items-end'>
                            <div>
                                <p className='text-[9px] font-bold uppercase tracking-widest opacity-30'>Holder</p>
                                <p className='text-sm font-bold uppercase'>{account.name}</p>
                            </div>
                            <p className='text-xs font-mono font-bold'>08/29</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8'>
                <div className='lg:col-span-12 bg-white rounded-xl p-8 border border-slate-100 shadow-sm relative overflow-hidden'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
                        <div className='flex gap-12'>
                            <div>
                                <p className='text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1'>Queue</p>
                                <div className='flex items-center gap-2'>
                                    <p className='text-2xl font-bold text-slate-800 tracking-tighter'>14</p>
                                    <span className='text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-sm'>+12%</span>
                                </div>
                            </div>
                            <div className='border-l border-slate-50 pl-12 text-center'>
                                <p className='text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1'>Total</p>
                                <p className='text-2xl font-bold text-slate-800 tracking-tighter'>2.4k</p>
                            </div>
                            <div className='border-l border-slate-50 pl-12'>
                                <p className='test-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1'>Gains</p>
                                <div className='flex items-center gap-2'>
                                    <p className='text-2xl font-bold text-emerald-500 tracking-tighter'>₹5.8k</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-end gap-3 h-20">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="w-2.5 rounded-sm bg-slate-50 h-full relative overflow-hidden">
                                    <div className={`absolute bottom-0 w-full rounded-sm transition-all duration-1000 ${i % 2 === 0 ? "bg-orange-400" : "bg-indigo-600"}`} style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='lg:col-span-9 space-y-5'>
                    <div className='flex items-center justify-between'>
                        <h4 className='text-lg font-bold text-slate-800 tracking-tight uppercase'>Activity Ledger</h4>
                        <div className='flex items-center gap-4'>
                            <Search size={16} className='text-slate-200' />
                            <Link to="/transactions"
                                className='text-indigo-600 font-bold text-[10px] uppercase tracking-widest hover:underline'
                            >
                                Full Statement
                            </Link>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm'>
                        {recentTransactions.length > 0 ? (
                            <div className='divide-y divide-slate-50'>
                                {recentTransactions.map((tx) => (
                                    <div key={tx.id}
                                        className='p-4 px-6 flex items-center justify-between hover:bg-slate-50/50
                                    transition-all group'
                                    >
                                        <div className='flex items-center space-x-6'>
                                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-[#f8fafc] border border-slate-100`}>
                                                {tx.type == "DEPOSIT" || tx.type == "INITIAL_DEPOSIT" ?
                                                    <ArrowUpRight size={16}
                                                        className='text-indigo-600'
                                                    /> : <ArrowDownLeft size={16}
                                                        className='text-orange-500' />}

                                            </div>
                                            <div className='flex items-center gap-10'>
                                                <div className='w-40xl:w-60'>
                                                    <p className='
                                                    font-bold text-slate-700 text-sm group-hover:text-indigo-600 transition-colors truncate
                                                    '>{tx.description}</p>
                                                </div>
                                                <p className='text-[10px] text-slate-300 font-semibold uppercase tracking-widest whitespace-nowrap'>
                                                    {new Date(tx.date).toLocaleDateString(undefined, {
                                                        month: "short",
                                                        day: "numeric"
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <p className={`text-lg font-bold tabular-nums tracking-tighter ${tx.type === "DEPOSIT" || tx.type === "INITIAL_DEPOSIT" ? "text-indigo-600" : "text-slate-800"}`}>
                                            {tx.type === "DEPOSIT" || tx.type === "INITIAL_DEPOSIT" ? "+" : "-"}
                                            {formatCurrency(tx.amount)}
                                        </p>
                                    </div>
                                ))}

                            </div>) : (
                            <div className='p-16 text-center text-slate-200 font-bold uppercase tracking-widest text-xs'>
                                No records
                            </div>)}
                    </div>
                </div>

                <div className='lg:col-span-3 space-y-5'>
                    <h4 className='text-lg font-bold text-slate-800 tracking-tight uppercase px-2'>Actions</h4>
                    <div className='bg-white rounded-xl p-6 border border-slate-100 space-y-3 shadow-sm'>
                        <Link to="/deposit"
                            className='flex items-center justify-between p-3.5
                        bg-indigo-50/50 rounded-lg
                        hover:bg-indigo-50 transition-colors
                        group border border-transparent
                        hover:border-indigo-100'
                        >
                            <div className='flex items-center gap-3'>
                                <div className='w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white shadow-sm'>
                                    <Plus size={16} />
                                </div>
                                <span
                                    className='text-xs font-bold text-slate-700 uppercase tracking-tighter'
                                >Inject Funds</span>
                            </div>
                            <ChevronRight
                                className='text-slate-300 group-hover:text-indigo-400 transition-all'
                                size={14} />
                        </Link>
                        <Link to='/withdraw'
                            className='flex justify-between p-3.5
                        bg-orange-50/50 rounded-lg
                        hover:bg-orange-50 transition-colors
                        group border border-transparent
                        hover:border-orange-100'
                        >
                            <div className='flex items-center gap-3'>
                                <div className='w-8 h-8 bg-orange-400 rounded-md flex items-center justify-center text-white shadow-sm'>
                                    <Minus size={16} />
                                </div>
                                <span className='text-xs font-bold text-slate-700 uppercase tracking-tighter'>Extract Cash</span>
                            </div>
                            <ChevronRight size={14}
                                className='text-slate-300 group-hover:text-orange-400 transition-all'
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard