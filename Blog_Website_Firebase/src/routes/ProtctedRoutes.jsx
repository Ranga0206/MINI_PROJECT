import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtctedRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    return (
        <div>{user ? <Layout>
            {children}
        </Layout> : <Navigate to="/register" />}</div>
    )
}

export default ProtctedRoutes