export async function fetchAssets<T>(): Promise<ApiResponse<T>> {
	const response = await fetch("/api/assets", {
		method: "GET",
		credentials: "include", // Send cookies
	});

	if (!response.ok) {
		return { error: "Unauthorized", data: [] as unknown as T };
	}

	return { data: await response.json() };
}
