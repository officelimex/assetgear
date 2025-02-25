import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = Cookies.get("token"); // Retrieve token from cookies

  return token ? children : <Navigate to="/" replace />;
}
