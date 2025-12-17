import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const API_URL = `http://localhost:3000/api/users`


const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, { params: { page, limit: 5, search } })
      //console.log(res.data);
      setUsers(res.data.data);
      //toast.success("Data Loaded");
      setPage(page);
      setTotalPages(res.data.total_page);

    }
    catch (err) {
      toast.error("Failed To fetch users", err)
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUsers(page, search);
  }, [page, search])


  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  }

  //reset

  const reset = () => {
    setFormData({
      name: "",
      email: "",
      age: ""
    })
    setShowForm(false);
  }

  const show = () => {
    reset();
    setShowForm(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.age) {
      toast.error("All fields are required");
      return;
    }
    try {
      if (editingId) {
        //update
        const res = await axios.put(`${API_URL}/${editingId}`, formData);
        toast.success("User Updated SuccessFully");
        setUsers(users.map((u) => (u._id === editingId ? res.data : u)));
        setShowForm(false);
        setEditingId(null)
      }
      else {
        //added
        const res = await axios.post(API_URL, formData);
        toast.success("User Created Successfully");
        if (users.length > 5) setUsers([...users, res.data])
        setShowForm(false);
      }

    } catch (error) {
      toast.error("Something Went Wrong", error);
    }
  }

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, age: user.age });
    setEditingId(user._id);
    setShowForm(true);
  }

  const deleteUser = async (id) => {
    if (!confirm("Are sure to deleted user ?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("User Delete SuccessFully !")
      fetchUsers(page, search);
    }
    catch (error) {
      toast.error("Something Went Wrong!")
    }
  }


  return (
    <>
      <Toaster position='top-right' />
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className='text-2xl font-bold mb-4'>User Mangement</h1>
          {/* search */}
          <div className='flex flex-col sm:flex-row gap-4 mb-6'>
            <input type="text" value={search} onChange={handleSearch} placeholder='Search by name ...' className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
            <button className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition' onClick={show}>Add User</button>
          </div>
          {/* Form Model */}

          {showForm && <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 '>
            <div className='bg-white p-6 rounded w-full max-w-md'>
              <h2 className='text-2xl font-semibold mb-4'>{editingId ? "Edit User" : "Create a new user"}</h2>

              <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className='w-full mb-3 px-4 py-2 border border-[#ccc] rounded-lg focus:outline-none focus:border-0 focus:ring-2 focus:ring-blue-500'
                />
                <input type="text" placeholder='Email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className='w-full mb-3 px-4 py-2 border border-[#ccc] rounded-lg focus:outline-none focus:border-0 focus:ring-2 focus:ring-blue-500'
                />
                <input type="text" placeholder='Age' value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className='w-full mb-3 px-4 py-2 border border-[#ccc]  rounded-lg focus:outline-none focus:border-0 focus:ring-2 focus:ring-blue-500'
                />
                <div className='flex gap-3 items-center mt-5'>
                  <button type='submit' className='flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700'>
                    {editingId ? "Update User" : "Create User"}
                  </button>
                  <button className='flex-1 bg-red-600 text-white py-2  rounded-lg hover:bg-red-700' onClick={reset}>Reset</button>
                </div>
              </form>
            </div>
          </div>}

          {/* Table */}
          <div>
            {loading ? (<p className='text-center'>loading...</p>) : (
              <div className='bg-white shadow-md rounded-lg overflow-hidden'>
                <table className='w-full'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Age</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {users.length === 0 ? (<tr>
                      <td colSpan="4" className='text-center py-8 text-gray-800'>No Users Found</td>
                    </tr>) : (
                      users.map((user) => (<tr key={user._id}>
                        <td className='px-6 py-4 whitespace-nowrap'>{user.name}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>{user.age}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>{user.email}</td>
                        <td className='px-6 py-4 text-right text-sm font-medium'>
                          <button className='text-indigo-600 hover:text-indigo-900 mr-4 cursor-pointer' onClick={() => handleEdit(user)}>Edit</button>
                          <button className='text-red-600 hover:text-red-900 cursor-pointer' onClick={() => deleteUser(user._id)}>Delete</button>
                        </td>
                      </tr>))
                    )}
                  </tbody>
                </table>

              </div>
            )}
          </div>

          {/* Pagination */}

          {totalPages > 1 && (<div className='flex justify-center mt-6 gap-2c'>
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className='px-4 py-2 cursor-pointer bg-blue-300 rounded disabled:opacity-50'>Previous</button>
            <span className='px-4 py-2'>
              Page {page} of {totalPages
              }
            </span>
            <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className='px-4 py-2 cursor-pointer bg-blue-300 rounded disabled:opacity-50'>Next</button>
          </div>)}
        </div>

      </div>
    </>
  )
}

export default App