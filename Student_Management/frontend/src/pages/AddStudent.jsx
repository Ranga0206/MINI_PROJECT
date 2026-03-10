import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    const [form, setForm] = useState({ name: "", rollNo: "", m1: 0, m2: 0, m3: 0, m4: 0, m5: 0 });

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name: form.name,
            rollNo: form.rollNo,
            marks: {
                m1: form.m1,
                m2: form.m2,
                m3: form.m3,
                m4: form.m4,
                m5: form.m5
            }
        }
        axios.post(`http://localhost:5000/api/students`, data);
        navigate("/");
    }
    return (
        <div className='max-w-2xl mx-auto bg-white p-8 rounded shadow-md mt-10'>
            <h2 className='text-2xl font-semibold mb-6 text-gray-800'>Add Student Marks</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <input type="text" placeholder='Full Name' className='border p-2 rounded' onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    <input type="text" placeholder='Roll Number' className='border p-2 rounded'
                        onChange={(e) => setForm({ ...form, rollNo: e.target.value })} required />
                </div>
                <p className='font-semibold text-gray-600'>Enter Marks (0-100)</p>
                <div className='grid grid-cols-5 gap-2'>
                    {[1, 2, 3, 4, 5].map((num) =>
                        (<input key={num} className='border p-2 rounded' placeholder={`Mark-${num}`} onChange={(e) => setForm({ ...form, [`m${num}`]: Number(e.target.value) })} required />))}
                </div>
                <button type="submit" className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'>Save Record</button>
            </form>

        </div>
    )
}

export default AddStudent