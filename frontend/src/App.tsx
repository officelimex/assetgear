import { Route, Routes } from "react-router-dom";
import LoginForm from "@/pages/auth/LoginForm";
import AppLayout from "@/pages/AppLayout";
import Dashboard from "@/pages/Dashboard";
import AccessPage from "@/pages/AccessPage";
import ResetPassword from "@/pages/auth/ResetPassword";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import VerifyOTP from "@/pages/auth/VerifyOTP";
import "react-toastify/dist/ReactToastify.css";

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
      <Route path="/app/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
