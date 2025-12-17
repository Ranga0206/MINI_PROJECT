import React, { useEffect, useState } from 'react'
import UserForm from './Components/UserForm'
import UserList from './Components/UserList'
import axios from "axios";
import "./App.css"
const App = () => {
  const [users, setUsers] = useState([]);

  const [editingUser, setEditingUser] = useState(null);

  const All_USER_API = "http://localhost:3000/api/users";

  //Get All User
  const fecthUsers = async () => {
    const res = await axios.get(All_USER_API);
    setUsers(res.data);
  }

  //Add New User
  const addUser = async (user) => {
    await axios.post(All_USER_API, user);
    fecthUsers();
  }

  //Delete User

  const deleteUser = async (id) => {
    if (confirm("Are You Sure To Delete ?")) {
      await axios.delete(`${All_USER_API}/${id}`);
    }

    fecthUsers();
  }

  //updateUser
  const updateUser = async (id, user) => {
    await axios.put(`${All_USER_API}/${id}`, user);
    fecthUsers();
    setEditingUser(null)
  }

  useEffect(() => {
    fecthUsers();
  }, [])

  return (
    <div style={{ padding: "20px", fontFamily: "Inter" }}>
      <h1>MYSQL CRUD WITH REACT &amp; NODE JS</h1>
      <UserForm addUser={addUser} editingUser={editingUser} setEditingUser={setEditingUser} updateUser={updateUser} />
      <UserList users={users} deleteUser={deleteUser} setEditingUser={setEditingUser} />

    </div>
  )
}

export default App