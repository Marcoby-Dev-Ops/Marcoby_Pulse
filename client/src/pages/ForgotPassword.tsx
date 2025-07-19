import { useRef, useState, type FormEvent } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import useAuthStore from "../stores/authStore";
import InputOtp from "../components/InputOtp";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isEmailSent, setIsEmailSent] = useState(false);
	const { sendResetPasswordOtp, isLoading, isMessageError, verifyResetPasswordDetails } = useAuthStore();
	const inputRefs = useRef<HTMLInputElement[]>([]);
	const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
	const [otp, setOtp] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmitEmail = async (e: FormEvent) => {
		e.preventDefault();

		const { success, message } = await sendResetPasswordOtp({ email });
		if (success) {
			setMessage(message);
			toast.success(message);
			setIsEmailSent(true);
		} else {
			setMessage(message);
			setIsEmailSent(false);
		}
	};

	const handleSendOtp = async () => {
		const { success, message } = await sendResetPasswordOtp({ email });
		if (success) {
			setMessage(message);
			toast.success(message);
		} else {
			setMessage(message);
		}
	};

	const handleSubmitOtp = async (e: FormEvent) => {
		e.preventDefault();

		const otpArray = inputRefs.current.map((e) => e.value);
		setOtp(otpArray.join(""));
		setIsOtpSubmitted(true);
	};

	const handleSubmitDetails = async (e: FormEvent) => {
		e.preventDefault();

		const { success, message } = await verifyResetPasswordDetails({ email, otp, newPassword });

		if (success) {
			setMessage(message);
			toast.success(message);
			navigate("/log-in");
		} else {
			if (message.includes("OTP")) {
				setIsOtpSubmitted(false);
				setMessage(message);
			}

			setMessage(message);
		}
	};

	return (
		<div className="min-h-[60vh] py-20 px-4">
			{/* EMAIL INPUT */}
			{!isEmailSent && (
				<Card className="rounded-md max-w-[500px] py-8 mx-auto bg-light dark:bg-foreground border-b-[1px] border-foreground/10 dark:border-offwhite/10">
					<CardHeader>
						<CardTitle className="font-Montserrat">Reset Your Password</CardTitle>
						<CardDescription className="text-background/70 dark:text-offwhite/70">
							Enter your email address and we'll send you a one-time code to reset your password.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-8" onSubmit={handleSubmitEmail}>
							<div className="space-y-4">
								{isMessageError && <p className="text-red-500 font-semibold">{message}</p>}
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<Button
								type="submit"
								className="w-full bg-regular/90 hover:bg-regular text-offwhite cursor-pointer"
								disabled={isLoading}>
								{isLoading ? <Loader className="animate-spin h-6 w-6" /> : "Submit"}
							</Button>
						</form>

						<Separator className="my-6" />
					</CardContent>
				</Card>
			)}

			{/* OTP INPUT */}
			{isEmailSent && !isOtpSubmitted && (
				<Card className="rounded-md max-w-[400px] mx-auto py-10 bg-light dark:bg-foreground border-b-[1px] border-foreground/10 dark:border-offwhite/10">
					<CardHeader>
						<CardTitle className="font-Poppins">Enter the 6-digit code sent to your email</CardTitle>
						{isMessageError && <p className="text-red-500 font-semibold">{message}</p>}
					</CardHeader>
					<CardContent className="flex flex-col gap-6">
						<form onSubmit={handleSubmitOtp} className="flex flex-col gap-6">
							<InputOtp inputRefs={inputRefs} />
							<Button
								type="submit"
								className="w-full bg-regular/90 hover:bg-regular text-offwhite cursor-pointer"
								disabled={isLoading}>
								{isLoading ? <Loader className="animate-spin h-8 w-8" /> : "Verify"}
							</Button>
						</form>

						<div className="flex flex-col gap-6">
							<div className="flex justify-between gap-2 w-fit items-center">
								<h3 className="font-semibold ">Didn't receive the code?</h3>
								<button className="text-darkgreen font-semibold cursor-pointer" onClick={handleSendOtp}>
									Resend code
								</button>
							</div>
							<p>
								Need help?{"  "}
								<span className="text-darkgreen font-bold hover:underline">
									<Link to="/support">Contact support</Link>
								</span>
							</p>
						</div>
					</CardContent>
				</Card>
			)}

			{/* NEW PASSWORD INPUT */}
			{isEmailSent && isOtpSubmitted && (
				<Card className="rounded-md max-w-[500px] py-8 mx-auto bg-light dark:bg-foreground border-b-[1px] border-foreground/10 dark:border-offwhite/10">
					<CardHeader>
						<CardTitle className="font-Montserrat">Reset Your Password</CardTitle>
						<CardDescription className="text-background/70 dark:text-offwhite/70">
							Enter your new password.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-8" onSubmit={handleSubmitDetails}>
							<div className="space-y-4">
								{isMessageError && !message.includes("OTP") && <p className="text-red-500">{message}</p>}
								<Label htmlFor="email">Email</Label>
								<Input
									id="password"
									type="password"
									placeholder="Enter your new password"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
								/>
							</div>
							<Button
								type="submit"
								className="w-full bg-regular/90 hover:bg-regular text-offwhite cursor-pointer"
								disabled={isLoading}>
								{isLoading ? <Loader className="animate-spin h-6 w-6" /> : "Reset Password"}
							</Button>
						</form>

						<Separator className="my-6" />
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default ForgotPassword;
