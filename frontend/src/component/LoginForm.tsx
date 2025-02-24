import { useState } from "react";
import { login } from "@/utils/auth";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const result = await login(email, password);

		if (result.error) {
			setError(result.error);
		} else {
			window.location.href = "/dashboard"; // Redirect on success
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button type="submit">Login</button>
			{error && <p>{error}</p>}
		</form>
	);
}
