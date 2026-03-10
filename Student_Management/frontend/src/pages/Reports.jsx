import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Reports = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:5000/api/students/all?status=${filter}`).then((res) => setData(res.data.results));
    }, [filter]);
    // console.log(data);
    return (
        <div className='mt-6'>
            <h2 className='text-2xl font-bold mb-4'>Academic Reports</h2>
            <div className='flex gap-4 mb-6'>
                <button onClick={() => setFilter("")} className='bg-gray-200 px-4 py-2 rounded cursor-pointer'>All Students</button>
                <button className='bg-green-200 px-4 py-2 rounded cursor-pointer' onClick={() => setFilter("Pass")}>Pass List</button>
                <button className='bg-red-200 px-4 py-2 rounded cursor-pointer' onClick={() => setFilter("Fail")}>Fail List</button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {data.map((s) => (<div
                    className={`p-4 bg-white border-l-4 shadow rounded ${s.grade == "Fail" ? "border-red-500" : "border-green-500"}`}
                    key={s._id}>
                    <h3 className='font-bold'>{s.name}</h3>
                    <p>Roll: {s.rollNo}
                    </p>
                    <p className={`text-xl font-bold ${s.grade == "Fail" ? "text-red-500" : "text-blue-500"}`}>{s.percentage}% - {s.grade}</p>
                </div>))}

            </div>
        </div>
    )
}

export default Reports