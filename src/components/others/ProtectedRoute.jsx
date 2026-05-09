import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from '../comman/Loader'

const ProtectedRoute = ({
  allowedRoles = [],
  redirectPath = "/login",
}) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;