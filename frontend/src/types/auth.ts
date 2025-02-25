/* export interface UserLogin {
	id: number;
	email: string;
	role: "admin" | "user";
}
 */
export interface LoginResponse {
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
