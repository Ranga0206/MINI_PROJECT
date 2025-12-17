import React, { useEffect, useState } from 'react'

const UserForm = ({ addUser, editingUser, updateUser, setEditingUser }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
        if (editingUser) {
            setName(editingUser.name);
            setEmail(editingUser.email);
            setAge(editingUser.age);
        }
        else {
            setName("");
            setEmail("");
            setAge("");
        }
    }, [editingUser])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            //update
            updateUser(editingUser.id, { name, email, age });

        }
        else {
            addUser({ name, email, age });
        }

        setName("")
        setEmail("")
        setAge("")
    }


    return (
        <form onSubmit={handleSubmit}>
            <input value={name} type="text" onChange={(e) => setName(e.target.value)} placeholder='Enter name' />
            <input value={email} type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
            <input value={age} onChange={(e) => setAge(e.target.value)} type="text" placeholder='Enter age' />
            <div className='controlls'>
                <button>{editingUser ? "UpdateUser" : "Add User"}</button>
                {editingUser && <button onClick={() => setEditingUser(null)}>Cancel</button>}
            </div>
        </form>
    )
}

export default UserForm