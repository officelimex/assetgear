import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, error, success, clearMessages } = useUser();

	useEffect(() => {
		clearMessages();
	}, [clearMessages]);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		await login(email, password);
	};

	return (
		<>
			<div className="card shadow p-4" style={{ width: "400px" }}>
				<h3 className="text-center mb-4">Login</h3>
				<form onSubmit={handleLogin}>
					<div className="mb-3 text-start">
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
					<div className="mb-4 text-start">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{error && <div className="alert alert-danger">{error}</div>}
					{success && <div className="alert alert-success">{success}</div>}
					<button type="submit" className="btn btn-primary w-100">
						Login
					</button>
				</form>
			</div>
			<div className="mt-4">
				<Link to="/forgot-password">I cant remember my password</Link>
			</div>
		</>
	);
}
