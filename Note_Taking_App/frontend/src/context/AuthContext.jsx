import { createContext, useEffect, useState } from "react";
import axios from "axios"
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/auth/me", { withCredentials: true });
            setUser(response.data);
            // console.log(user);
        } catch (error) {
            setUser(null);
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const login = async (userData) => {
        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", userData, { withCredentials: true });
            if (response.data.message = "Login Successfully") {
                fetchUser();
                return true;
            }
            return false;
        } catch (error) {
            setUser(null);
            console.log(error);

        }
    }

    const logout = async () => {
        try {
            await axios.post("http://localhost:8000/api/auth/logout", {}, { withCredentials: true });
            setUser(null);
        }
        catch (err) {
            setUser(null);
            console.log("Logout Error : ", err)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return <AuthContext.Provider value={{ user, loading, logout, login }}>{children}</AuthContext.Provider>
};