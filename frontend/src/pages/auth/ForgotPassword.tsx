import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const { forgotPassword, error, success, clearMessages } = useUser();

	useEffect(() => {
		clearMessages();
	}, [clearMessages]);

	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		await forgotPassword(email);
	};

	return (
		<>
			<div className="card shadow p-4" style={{ width: "400px" }}>
				<h2 className="card-title text-center mb-4">Forgot Password</h2>
				<form onSubmit={handleForgotPassword}>
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
					{error && <div className="alert alert-danger">{error}</div>}
					{success && <div className="alert alert-success">{success}</div>}
					<button type="submit" className="btn btn-primary w-100">
						Send Reset Link
					</button>
				</form>
			</div>
			<div className="mt-4">
				Oh.. I remember my password now. <Link to="/login">Login</Link>
			</div>
		</>
	);
}
