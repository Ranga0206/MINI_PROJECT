import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    // console.log("Students", students);
    useEffect(() => {
        const loadStudents = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`http://localhost:5000/api/students?page=${page}&search=${search}`)
                setStudents(data.results);
                setTotalPages(data.totalPages);
            }
            catch (err) {

            }
            finally {
                setLoading(false);
            }
        };
        loadStudents();
    }, [page, search]);

    const handleDelete = async (id) => {
        if (window.confirm("Delete record?")) {
            await axios.delete(`http://localhost:5000/api/students/${id}`);
            setStudents((prev) => prev.filter((s) => s._id !== id))
        }

    }
    return (
        <div className='p-6'>
            <div className='flex flex-col md:flex-row justify-between  mb-4'>
                <input className='border p-2 rounded w-full md:w-80 shadow-sm' type="text"

                    placeholder='Search Name' onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }} />
                <Link to="/add"
                    className='bg-blue-600 text-white px-4 py-2
                rounded shadow hover:bg-blue-700 text-center'
                >AddStudent</Link>
            </div>
            {loading ? <div className='text-center py-10 font-bold text-blue-600'>LoadingData...</div> : <div className='bg-white rounded shadow overflow-hidden border border-gray-200'>
                <table className='w-full text-left'>
                    <thead className='bg-slate-800 text-white uppercase text-xs'>
                        <tr>
                            <th className='p-4'>Name</th>
                            <th className='p-4'>Roll No</th>
                            <th className='p-4'>Total</th>
                            <th className='p-4'>Grade</th>
                            <th className='p-4'>Status</th>
                            <th className='p-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((stu) => (<tr className='border-b hover:bg-slate-50 transition' key={stu._id}>
                            <td className='p-4 font-medium'>{stu.name}</td>
                            <td className='p-4 text-gray-600'>{stu.rollNo}</td>
                            <td className={`p-4 text-gray-800 font-semibold ${stu.grade == "Fail" && "text-red-500"}`}>{stu.total}</td>
                            <td className={`p-4 font-semibold ${stu.grade == "Fail" ? "text-red-500" : "text-green-500"}`}>{stu.grade}</td>
                            <td className={`p-4 font-semibold ${stu.grade == "Fail" ? "text-red-500" : "text-green-500"}`}>{stu.status}</td>
                            <td className='p-4 space-x-3 text-sm'>
                                <Link className='text-blue-600 hover:underline font-semibold' to={`/edit/${stu._id}`}>Edit</Link>
                                <button className='text-red-600 hover:underline cursor-pointer' onClick={() => handleDelete(stu._id)}>Delete</button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>}
            {/* pagination */}
            <div className='flex mt-6 justify-center gap-2'>
                {[...Array(totalPages)].map((_, i) =>
                    (<button onClick={() => setPage(i + 1)} className={`px-4 py-2 rounded-md border transition ${page === i + 1 ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 hover:bg-gray-100"}`} key={i}>{i + 1}</button>)
                )}
            </div>
        </div>
    )
}

export default Dashboard