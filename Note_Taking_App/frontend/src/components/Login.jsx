import React, { use, useContext, useState } from 'react'

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const Login = () => {

    const [username, SetUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { user, login, loading } = useContext(AuthContext);

    const navigate = useNavigate();

    if (loading) {
        return <div>loading....</div>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login({ username, password });
        if (success) {
            navigate("/dashboard");
        }
        else {
            setError("Login failed: Invalid response from Server")
        }
        try {

        } catch (error) {
            setError(error.response?.data?.message || "Login Failed")

        }
    }
    return (
        <div className='form-container'>
            <div className='form-card'>
                <h4 className='form-title'>Login</h4>
                {error && <p className='error'>{error}</p>}
                <div className='form-group'>
                    <input type="text" value={username} onChange={(e) => SetUsername(e.target.value)} placeholder='Username or Email' className='form-input' />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-input' />
                    <button className='form-button' onClick={handleSubmit}>Login</button>
                    <p>Don't have an account ? <Link to="/register">Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login