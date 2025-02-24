import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "@/pages/auth/LoginForm";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import WelcomePage from "@/pages/WelcomePage";
import ResetPassword from "@/pages/auth/ResetPassword";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import VerifyOTP from "@/pages/auth/VerifyOTP";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<WelcomePage />}>
				<Route index element={<LoginForm />} />
				<Route path="auth/login" element={<LoginForm />} />
				<Route path="auth/reset-password" element={<ResetPassword />} />
				<Route path="auth/forgot-password" element={<ForgotPassword />} />
				<Route path="auth/verify/:email/:otp" element={<VerifyOTP />} />
				<Route path="auth/verify/:email" element={<VerifyOTP />} />
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
