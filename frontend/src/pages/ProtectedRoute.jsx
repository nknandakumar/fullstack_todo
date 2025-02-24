import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
