import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const ProtectedRoute = () => {
	const { user } = useUser();

	if (!user) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
