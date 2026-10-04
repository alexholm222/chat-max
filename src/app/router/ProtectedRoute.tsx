import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useInstanceStore } from "../../entities/instance";

export const ProtectedRoute = () => {
  const instance = useInstanceStore((state) => state.instance);
  const location = useLocation();

  if (!instance)
    return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
};
