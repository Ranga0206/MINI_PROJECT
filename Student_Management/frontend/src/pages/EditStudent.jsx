import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
    const [form, setForm] = useState({ name: "", rollNo: "", m1: 0, m2: 0, m3: 0, m4: 0, m5: 0 });
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/api/students/${id}`).then((res) => {
            const s = res.data;
            setForm({ name: s.name, rollNo: s.rollNo, ...s.marks })
        })
    }, [id]);
    const handleUpdate = (e) => {
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
        axios.put(`http://localhost:5000/api/students/${id}`, data);
        navigate("/");
    };
    return (
        <div className='max-w-2xl mx-auto bg-white p-8 rounded shadow-md mt-10'>
            <h2 className='text-2xl font-semibold mb-6 text-gray-800'>Edit Student Record</h2>
            <form onSubmit={handleUpdate} className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <input type="text"
                        value={form.name}
                        placeholder='Full Name' className='border p-2 rounded' onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    <input type="text"
                        value={form.rollNo}
                        placeholder='Roll Number' className='border p-2 rounded'
                        onChange={(e) => setForm({ ...form, rollNo: e.target.value })} required />
                </div>
                <p className='font-semibold text-gray-600'>Enter Marks (0-100)</p>
                <div className='grid grid-cols-5 gap-2'>
                    {[1, 2, 3, 4, 5].map((num) =>
                    (<input

                        value={form[`m${num}`]}
                        key={num} className='border p-2 rounded' placeholder={`Mark-${num}`} onChange={(e) => setForm({ ...form, [`m${num}`]: Number(e.target.value) })} required />))}
                </div>
                <button type="submit" className='w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-600 transition'>Update Record</button>
            </form>

        </div>
    )
}

export default EditStudent