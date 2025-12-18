import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios';

const Profile = () => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [profileImage, setProfileImage] = useState(null);






    const fetchUser = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/auth/me", { withCredentials: true })
            // console.log("res :", res)
            setUser(res.data);
        }
        catch (err) {
            console.log(err);
            setError(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append("profile_image", profileImage);

        try {

            const res = await axios.post("http://localhost:8000/api/auth/upload-profile-image", formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
            setUser({ ...user, profile_image: res.data.profile_image });
            setProfileImage(null);
        }
        catch (err) {
            console.log(err);
            setError("Failed To Upload Image");
        }
    }

    if (!user && !error) {
        return <div>Loading....</div>
    }

    return (
        <div className='profile-container'>
            <div className='profile-card'>
                <h4 className='profile-title'>Profile</h4>
                {error && <p className='error'>{error}</p>}
                <div className='profile-info'>
                    <p>
                        <strong>UserName :  </strong>{user.username}
                    </p>
                    <p>
                        <strong>Email :  </strong>{user.email}
                    </p>
                    <p>
                        <strong>Contact :  </strong> {user.contact ? user.contact : "No contact"}
                    </p>
                    {user.profile_image && <img src={`http://localhost:8000${user.profile_image}`} alt="profile_image" />}
                    <input type="file" accept='image/*' className='form-input' onChange={(e) => setProfileImage(e.target.files[0])} />
                    {profileImage && <button className='form-button' onClick={handleImageUpload}>Upload Profile Image</button>}


                </div>
            </div>
        </div>
    )
}

export default Profile