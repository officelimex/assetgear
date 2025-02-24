const API_URL = "/api";

export async function login(
	email: string,
	password: string
): Promise<ApiResponse<LoginResponse>> {
	const response = await fetch(`${API_URL}/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
		credentials: "include", // Send cookies
	});

	if (!response.ok) {
		return { error: "Login failed", data: { message: "" } };
	}

	return { data: await response.json() };
}

export async function logout(): Promise<void> {
	await fetch(`${API_URL}/logout`, { method: "POST", credentials: "include" });
}
