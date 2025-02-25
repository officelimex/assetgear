import { Route, Routes } from "react-router-dom";
import LoginForm from "@/pages/auth/LoginForm";
import AppLayout from "@/pages/AppLayout";
import Dashboard from "@/pages/Dashboard";
import AccessPage from "@/pages/AccessPage";
import ResetPassword from "@/pages/auth/ResetPassword";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import VerifyOTP from "@/pages/auth/VerifyOTP";
import ProtectedRoute from "@/components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import AssetList from "./pages/AssetPage";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<AccessPage />}>
				<Route index element={<LoginForm />} />
				<Route path="auth/login" element={<LoginForm />} />
				<Route
					path="auth/reset-password/:email/:otp"
					element={<ResetPassword />}
				/>
				<Route path="auth/forgot-password" element={<ForgotPassword />} />
				<Route path="auth/verify/:email/:otp" element={<VerifyOTP />} />
				<Route path="auth/verify/:email" element={<VerifyOTP />} />
			</Route>

			{/* Protect the /app routes */}
			<Route path="/app/" element={<ProtectedRoute />}>
				<Route element={<AppLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="assets" element={<AssetList />} />
				</Route>
			</Route>
		</Routes>
	);
}
