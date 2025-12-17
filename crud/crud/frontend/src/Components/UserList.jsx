import React from 'react'

const UserList = ({ users, deleteUser, setEditingUser }) => {
    return (
        <div>
            <h2>Users List</h2>
            {users.length == 0 ? <p>No Users Found</p> :
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((data, index) => <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.age}</td>
                            <td>
                                <div>
                                    <button onClick={() => setEditingUser(data)}>Edit</button>
                                    <button onClick={() => deleteUser(data.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>}
        </div>
    )
}

export default UserList