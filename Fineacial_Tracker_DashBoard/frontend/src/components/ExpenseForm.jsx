import React, { useState } from 'react'
import toast from 'react-hot-toast';

const category = ["Food", "Transport", "Utilities", "Entertainment", "Others"];

const labelClass = 'block text-sm font-medium text-gray-700 mb-1';
const inputClass = 'w-full p-3 border border-gray-300 rounded  focus:ring-blue-800 focus:border-blue-500 focus:outline-0';

const ExpenseForm = ({ handleAddExpense }) => {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: category[0],
        date: new Date().toISOString().split('T')[0],
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.amount || !formData.category || !formData.date) {
            toast.error("Please Fill All Fileds")
            return;
        }

        const expenseData = { ...formData, amount: parseFloat(formData.amount) }
        handleAddExpense(expenseData);
        setFormData({
            title: "",
            amount: "",
            category: category[0],
            date: new Date().toISOString().split('T')[0],
        });
    }

    return (
        <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
                <label className={labelClass} htmlFor="title">Title</label>
                <input value={formData.title} onChange={handleChange} className={inputClass} type="text" name="title" id="title" placeholder='e.g., Coffee,Bus Ticket' required />
            </div>
            <div>
                <label className={labelClass} htmlFor="amount">Amount</label>
                <input className={inputClass} value={formData.amount} onChange={handleChange} type="number" name="amount" id="amount" placeholder='0.00' required />
            </div>
            <div>
                <label htmlFor="category" className={labelClass}>
                    Category
                </label>
                <select value={formData.category} onChange={handleChange} name="category" id="category" className={inputClass} required>
                    {category.map((cat) => (< option key={cat}>
                        {cat}
                    </option>))}
                </select>
            </div>
            <div>
                <label htmlFor="date" className={labelClass}>
                    Date
                </label>
                <input value={formData.date} onChange={handleChange} type="date" className={inputClass} name="date" id="date" required />
            </div>
            <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-md border-0 outline-0'>Add Expense</button>
        </form >
    )
}

export default ExpenseForm