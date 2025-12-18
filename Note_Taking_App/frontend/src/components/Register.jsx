import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState("");


    const navigae = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData();

        formdata.append("username", username);
        formdata.append("email", email);
        formdata.append("contact", contact);
        formdata.append("password", password);
        if (profileImage) {
            formdata.append("profile_image", profileImage)
        }
        try {
            await axios.post("http://localhost:8000/api/auth/register", formdata, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true })
            navigae("/login");
        } catch (error) {
            setError(error.response?.data?.message || "Registation failed")

        }
    }

    return (
        <div className='form-container'>
            <div className='form-card'>
                <h4 className='form-title'>Register</h4>
                {error && <p className='error' >{error}</p>}
                <div className='form-group'>
                    <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className='form-input' />
                    <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-input' />
                    <input type="text" placeholder='Contact (optional)' value={contact} onChange={(e) => setContact(e.target.value)} className='form-input' />
                    <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-input' />
                    <input type="file" accept='image/*' className='form-input' onChange={(e) => setProfileImage(e.target.files[0])} />
                    <button onClick={handleSubmit} className='form-button'>Register</button>
                    <p>Already have an account ? <Link to="/login">Sign in</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register