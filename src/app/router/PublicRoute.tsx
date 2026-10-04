import { Navigate, Outlet } from "react-router-dom";
import { useInstanceStore } from "../../entities/instance";

export const PublicRoute = () => {
  const instance = useInstanceStore((state) => state.instance);

 /*  if (status === "loading") {
    return <div>Loading...</div>;
  } */
 

  if (instance) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
