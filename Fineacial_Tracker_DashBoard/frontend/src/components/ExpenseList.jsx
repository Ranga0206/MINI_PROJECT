import React from 'react'
import { formatDate, formatINR } from '../utils/helper'

const ExpenseList = ({ expense, loading, handleDelete }) => {
    if (loading) {
        return <div className='mt-8 p-6 bg-white rounded-xl shadow-lg text-center text-gray-500'>Loading...</div>
    }
    if (expense.length === 0) {
        return <div className='mt-8 p-6 bg-white rounded-xl shadow-lg text-center text-gray-500'>No expenses recorded yet. Start adding some!</div>
    }

    return (
        <div className='mt-8 p-6 bg-white rounded-xl shadow-lg'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-700'>Expense History</h2>
            <ul className='cursor-pointer'>
                {expense.map((exp) => (<li key={exp._id} className='flex justify-between px-2 items-center py-3 hover:bg-gray-100 transition duration-150 rounded'>
                    <div className='flex flex-col'>
                        <span className='font-semibold px-2 text-gray-800'>{exp.title}</span>
                        <span className='text-sm text-gray-500 px-2'>{exp.category} | {formatDate(exp.date)}</span>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <span className='text-lg font-bold text-red-600'>{formatINR(exp.amount)}</span>
                        <button onClick={() => handleDelete(exp._id)} title="Delete Expense" className='text-red-600 hover:text-red-700 transition duration-150 rounded-full p-2 cursor-pointer hover:bg-red-50'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 -960 960 960" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                        </button>
                    </div>
                </li>))}
            </ul>
        </div>
    )
}

export default ExpenseList