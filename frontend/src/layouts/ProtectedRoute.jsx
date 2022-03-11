import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) return "Cargando...";

  return <>{auth._id ? "Autenticado" : <Navigate to="/" />}</>;
};

export default ProtectedRoute;
