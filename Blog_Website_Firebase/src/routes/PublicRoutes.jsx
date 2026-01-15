import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    return (
        <div>{user ? <Navigate to="/" /> : children}</div>
    )
}

export default PublicRoutes