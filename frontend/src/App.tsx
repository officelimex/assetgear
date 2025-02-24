import { Route, Routes } from "react-router-dom";
import LoginForm from "@/pages/auth/LoginForm";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import WelcomePage from "@/pages/WelcomePage";
import ResetPassword from "@/pages/auth/ResetPassword";
import ForgotPassword from "@/pages/auth/ForgotPassword";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<WelcomePage />}>
				<Route index element={<LoginForm />} />
				<Route path="login" element={<LoginForm />} />
				<Route path="reset-password" element={<ResetPassword />} />
				<Route path="forgot-password" element={<ForgotPassword />} />
			</Route>
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
