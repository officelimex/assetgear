import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import LoadingButton from "@/components/LoadingButton";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const { sendOTP, error, success, loading, clearMessages } = useUser();

	useEffect(() => {
		clearMessages();
	}, []);

	const handlesendOTP = async (e: React.FormEvent) => {
		e.preventDefault();
		await sendOTP(email);
	};

	return (
		<>
			<div className="card shadow p-4" style={{ width: "400px" }}>
				<h4 className="card-title text-center mb-4">Forgot Password</h4>
				{error && <div className="alert alert-danger">{error}</div>}
				{success && <div className="alert alert-success">{success}</div>}
				<form onSubmit={handlesendOTP}>
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
					<LoadingButton loading={loading}>Send Reset Link</LoadingButton>
				</form>
			</div>
			<div className="mt-4 text-center">
				Oh.. I remember my password now. <Link to="/auth/login">Login</Link>
			</div>
		</>
	);
}
