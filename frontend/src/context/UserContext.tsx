import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/utils/axiosConfig";
import { User } from "@/types/user";

interface UserContextProps {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	sendOTP: (email: string) => Promise<void>;
	resetPassword: (
		email: string,
		otp: string,
		newPassword: string
	) => Promise<void>;
	verifyOTP: (email: string, otp: string) => Promise<void>;
	error: string;
	success: string;
	loading: boolean;
	clearMessages: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<User | null>(() => {
		// Load user from localStorage on initial render
		const storedUser = localStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser) : null;
	});
	const navigate = useNavigate();

	const fetchUser = async () => {
		setLoading(true);
		try {
			const response = await axios.get("user/info", { withCredentials: true });
			if (response.data) {
				setUser(response.data.data);
				localStorage.setItem("user", JSON.stringify(response.data.data)); // Save to localStorage
				setError("");
			}
		} catch (err) {
			setUser(null);
			localStorage.removeItem("user"); // Clear user on error
			setSuccess("");
		} finally {
			setLoading(false);
		}
	};

	const login = async (email: string, password: string) => {
		setLoading(true);
		try {
			const response = await axios.post(
				"auth/signin",
				{ email, password },
				{ withCredentials: true }
			);
			if (response.data) {
				setSuccess("Login successful.");
				setError("");
				await fetchUser();
				navigate("/app");
			}
		} catch (err) {
			setError("Failed to login. Please try again.");
			setSuccess("");
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			const response = await axios.post("auth/signout", {
				withCredentials: true,
			});
			if (response.data) {
				setError("");
				setUser(null);
				localStorage.removeItem("user"); // Remove user from localStorage
				navigate("/");
			}
		} catch (err) {
			setError("Failed to logout. Please try again.");
			setSuccess("");
		} finally {
			setLoading(false);
		}
	};

	const sendOTP = async (email: string) => {
		setLoading(true);
		try {
			const response = await axios.post("auth/send-otp", { email });
			if (response.data) {
				setSuccess("Password reset link has been sent to your email.");
				setError("");
				navigate(`/auth/verify/${email}`);
			}
		} catch (err) {
			setError("Failed to send password reset link. Please try again.");
			setSuccess("");
		} finally {
			setLoading(false);
		}
	};

	const resetPassword = async (
		email: string,
		otp: string,
		newPassword: string
	) => {
		setLoading(true);
		try {
			const response = await axios.post("auth/reset-password", {
				email,
				otp,
				new_password: newPassword,
			});
			if (response.data) {
				setSuccess(
					"Password reset successful. You can now login with your new password."
				);
				setError("");
				navigate("/auth/login");
			}
		} catch (err) {
			setError("Failed to reset password. Please try again.");
			setSuccess("");
		} finally {
			setLoading(false);
		}
	};

	const verifyOTP = async (email: string, otp: string) => {
		setLoading(true);
		try {
			const response = await axios.post("auth/verify-otp", { email, otp });
			if (response.data) {
				setSuccess("OTP verified successfully.");
				setError("");
				navigate(`/auth/reset-password/${email}/${otp}`);
			}
		} catch (err) {
			setError("Failed to verify OTP. Please try again.");
			setSuccess("");
		} finally {
			setLoading(false);
		}
	};

	const clearMessages = () => {
		setError("");
		setSuccess("");
	};

	return (
		<UserContext.Provider
			value={{
				user,
				login,
				logout,
				sendOTP,
				resetPassword,
				verifyOTP,
				error,
				success,
				loading,
				clearMessages,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
