import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingButton from "@/components/LoadingButton";

export default function ResetPassword() {
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const { resetPassword, error, success, loading, clearMessages } = useUser();

	useEffect(() => {
		clearMessages();
	}, []);

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		await resetPassword(email, otp, newPassword);
	};

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
			<div className="card p-4" style={{ width: "400px" }}>
				<h4 className="card-title text-center mb-4">Reset Password</h4>
				<form onSubmit={handleResetPassword}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="otp" className="form-label">
							OTP
						</label>
						<input
							type="text"
							className="form-control"
							id="otp"
							placeholder="Enter the OTP sent to your email"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="newPassword" className="form-label">
							New Password
						</label>
						<input
							type="password"
							className="form-control"
							id="newPassword"
							placeholder="Enter your new password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							required
						/>
					</div>
					{error && <div className="alert alert-danger">{error}</div>}
					{success && <div className="alert alert-success">{success}</div>}
					<LoadingButton loading={loading}>Reset Password</LoadingButton>
				</form>
			</div>
		</div>
	);
}
