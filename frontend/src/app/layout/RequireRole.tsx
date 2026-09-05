import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/auth.store";

const RequireRole = ({ role }: { role: string }) => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
};

export default RequireRole;
