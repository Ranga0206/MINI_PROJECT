import { useMemo } from "react"
import { formatINR } from "../utils/helper"


const TotalExpense = ({ expense, loading }) => {

    const total = useMemo(() => {
        return expense.reduce((acc, curr) => (acc + curr.amount), 0);
    }, [expense]);

    return (
        <div className='p-6 bg-green-600 text-white shadow rounded-lg mb-8'>
            <h2 className='text-xl font-medium mb-1'>Total Expenses</h2>
            {loading ? <p className='text-3xl font-bold'>Calculating...</p> : <p className='text-4xl font-bold'>{formatINR(total)}</p>}


        </div>
    )
}

export default TotalExpense