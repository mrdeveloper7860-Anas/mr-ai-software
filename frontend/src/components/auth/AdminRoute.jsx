import { Navigate, useLocation } from "react-router-dom";
import { isAdminAuthenticated } from "@/lib/adminApi";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const authenticated = isAdminAuthenticated();

  if (!authenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
