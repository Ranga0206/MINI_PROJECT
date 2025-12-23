import React, { useEffect, useState } from 'react'
import ExpenseForm from "../components/ExpenseForm"
import TotalExpense from "../components/TotalExpense"
import CategoryChart from "../components/CategoryChart"
import ExpenseList from "../components/ExpenseList"
import axios from "axios";
import toast from "react-hot-toast";
const Dashboard = () => {
    const API_URL = "http://localhost:8000/api/v1/expenses";
    const [expense, setExpense] = useState([]);
    const [loading, setLoading] = useState(true);
    //get Function
    const fetchExpense = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_URL);
            setExpense(res.data.data);

        }
        catch (err) {
            toast.error("Failed to fecth expenses");
            console.log(err.message)
        }
        finally {
            setLoading(false);
        }
    }

    //Add New Expense
    const handleAddExpense = async (newExpenseData) => {
        try {
            await axios.post(API_URL, newExpenseData);
            toast.success("Expense Added SuccessFully");
            fetchExpense();
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Failed to add expense."
            toast.error(errorMessage);
        }
    }

    //Delete Expense

    const handleDelete = async (id) => {
        const orginalExpense = expense;
        setExpense(expense.filter((exp) => exp._id !== id));
        try {
            await axios.delete(`${API_URL}/${id}`);
            toast.success("Expense deleted successfully");
        }
        catch (error) {
            const errorMessage = error.response?.data?.error || "Failed to add expense."
            toast.error(errorMessage);
            setExpense(orginalExpense);
        }
    }

    useEffect(() => {
        fetchExpense();
    }, [])
    return (
        <div className='max-w-6xl mx-auto'>
            <div className='flex flex-col lg:flex-row gap-8'>
                <aside className='w-full lg:w-1/4'>
                    <h2 className='text-xl  font-semibold mb-4 text-pink-500'>Add Expense</h2>
                    <ExpenseForm handleAddExpense={handleAddExpense} />
                </aside>
                <main className='flex-1 flex flex-col gap-6'>
                    <TotalExpense expense={expense} loading={loading} />
                    <div>
                        <div>
                            <CategoryChart expense={expense} />
                        </div>
                    </div>
                    <div className='flex-1'>
                        <ExpenseList expense={expense} loading={loading} handleDelete={handleDelete} />
                    </div>
                </main>
            </div>
        </div >
    )
}

export default Dashboard