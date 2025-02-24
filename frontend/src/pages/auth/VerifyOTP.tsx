import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import "@/assets/OTP.css";
import { OTPInput } from "input-otp";
import LoadingButton from "@/components/LoadingButton";

const VerifyOTP: React.FC = () => {
	const { email: paramEmail, otp: paramOtp } = useParams<{
		email?: string;
		otp?: string;
	}>();
	const [email] = useState(paramEmail || "");
	const [otp, setOtp] = useState(paramOtp || "");
	const { verifyOTP, error, success, loading, clearMessages } = useUser();

	useEffect(() => {
		clearMessages();
	}, []);

	const handleVerifyOTP = async (e: React.FormEvent) => {
		e.preventDefault();
		await verifyOTP(email, otp);
	};

	return (
		<>
			<div className="shadow card p-4" style={{ width: "400px" }}>
				<h4 className="card-title text-center my-4">Enter OTP to Verify</h4>
				<p className="text-center text-muted mb-3">
					We've sent a one-time password (OTP) to your email{" "}
					<span className="fw-bold">{email}</span>.
				</p>
				<p className="text-center py-4">
					Enter it below to verify your account.
				</p>
				<form onSubmit={handleVerifyOTP}>
					<div className="mb-3">
						<OTPInput
							value={otp}
							onChange={(value: string) => setOtp(value)}
							maxLength={5}
							inputMode="tel"
							containerClassName="d-flex justify-content-center gap-2"
							render={({ slots }) => (
								<>
									{slots.map((slot, idx) => (
										<div
											key={idx}
											className={`otp-slot ${slot.isActive ? "otp-slot-active" : ""}`}>
											{slot.char ?? slot.placeholderChar}
										</div>
									))}
								</>
							)}
						/>
					</div>
					{error && <div className="alert alert-danger">{error}</div>}
					{success && <div className="alert alert-success">{success}</div>}
					<LoadingButton loading={loading}>Verify Account</LoadingButton>
				</form>
			</div>
			<div className="text-center py-4">
				<Link to="/auth/login">Login</Link> /{" "}
				<Link to="/auth/forgot-password">Forget Password</Link>
			</div>
		</>
	);
};

export default VerifyOTP;
