import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserContextProps {
	login: (email: string, password: string) => Promise<void>;
	forgotPassword: (email: string) => Promise<void>;
	resetPassword: (
		email: string,
		otp: string,
		newPassword: string
	) => Promise<void>;
	error: string;
	success: string;
	clearMessages: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	const login = async (email: string, password: string) => {
		// Implement login logic here
		// Example: const result = await loginUser(email, password);

		// Mock result for demonstration
		const result = { success: true };

		if (result.success) {
			setSuccess("Login successful.");
			setError("");
			navigate("/dashboard");
		} else {
			setError("Failed to login. Please try again.");
			setSuccess("");
		}
	};

	const forgotPassword = async (email: string) => {
		// Implement forgot password logic here
		// Example: const result = await requestPasswordReset(email);

		// Mock result for demonstration
		const result = { success: true };

		if (result.success) {
			setSuccess("Password reset link has been sent to your email.");
			setError("");
		} else {
			setError("Failed to send password reset link. Please try again.");
			setSuccess("");
		}
	};

	const resetPassword = async (
		email: string,
		otp: string,
		newPassword: string
	) => {
		// Implement reset password logic here
		// Example: const result = await resetUserPassword(email, otp, newPassword);

		// Mock result for demonstration
		const result = { success: true };

		if (result.success) {
			setSuccess(
				"Password reset successful. You can now login with your new password."
			);
			setError("");
			navigate("/login");
		} else {
			setError("Failed to reset password. Please try again.");
			setSuccess("");
		}
	};

	const clearMessages = () => {
		setError("");
		setSuccess("");
	};

	return (
		<UserContext.Provider
			value={{
				login,
				forgotPassword,
				resetPassword,
				error,
				success,
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
