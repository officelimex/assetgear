import { Route, Routes } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<LoginForm />} />
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}
