import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingButton from "@/components/LoadingButton";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, success, loading, clearMessages } = useUser();
	const { email, otp } = useParams();

	useEffect(() => {
		clearMessages();
	}, []);

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		if (email && otp) {
			await resetPassword(email, otp, newPassword);
		} else {
			toast.error("Email or OTP is missing");
		}
	};

	return (
		<div className="shadow card p-4" style={{ width: "400px" }}>
			<h4 className="card-title text-center mb-4">Reset Password</h4>
			<form onSubmit={handleResetPassword}>
				<div className="mb-3">
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
				<div className="mb-3">
					<input
						type="password"
						className="form-control"
						id="confirmPassword"
						placeholder="Confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				{error && <div className="alert alert-danger">{error}</div>}
				{success && <div className="alert alert-success">{success}</div>}
				<LoadingButton loading={loading}>Reset Password</LoadingButton>
			</form>
		</div>
	);
}
