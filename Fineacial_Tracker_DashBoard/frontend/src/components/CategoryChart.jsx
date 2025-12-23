import React, { useMemo } from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#0088fe", "#00c49f", "#ffbb26", "#ff8042", "#af19ff"];

const CategoryChart = ({ expense }) => {

    const chartData = useMemo(() => {
        const categoryMap = expense.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {})

        return Object.keys(categoryMap).map((cate) => ({
            name: cate,
            value: categoryMap[cate],
        }))
    }, [expense])


    if (chartData.length === 0) {
        return <div className='text-center text-gray-500 p-4'>No data to display in the chart.</div>
    }
    return (
        <div className='w-full h-80'>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={chartData} paddingAngle={5} dataKey="value">
                        {chartData.map((entry, index) => (
                            <Cell fill={COLORS[index % COLORS.length]} key={`cell-${index}`} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CategoryChart