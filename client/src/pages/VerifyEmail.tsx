import { CheckCircle, Mail, RefreshCw } from "lucide-react";
import logo from "../assets/images/logo.png";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import InputOtp from "../components/InputOtp";
import useAuthStore from "../stores/authStore";
import toast from "react-hot-toast";
import { useRef, useState, type FormEvent } from "react";
import useUserStore from "../stores/userStore";

const verifyTodos = [
	{
		text: "Check your spam folder if you don't see the email",
	},
	{
		text: "Make sure your email is correct",
	},
	{
		text: "Contact support if you continue having issues",
	},
];

const VerifyEmail = () => {
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const [isVerifying, setIsVerifying] = useState(false);
	const navigate = useNavigate();
	const { sendVerificationOtp, verifyOtp } = useAuthStore();
	const { getUserData, user } = useUserStore();

	const handleSendOtp = async () => {
		const { success, message } = await sendVerificationOtp();
		if (success) {
			toast.success(message);
		} else {
			toast.error(message);
		}
	};

	const verifyOtpCode = async (otpCode: string) => {
		if (isVerifying) return;

		setIsVerifying(true);

		try {
			const { success, message } = await verifyOtp({ otp: otpCode });

			if (success) {
				toast.success(message);
				await getUserData();
				navigate("/dashboard");
			} else {
				toast.error(message);
				inputRefs.current[0]?.focus();
				inputRefs.current.forEach((input) => {
					if (input) input.value = "";
				});
			}
		} catch (error: any) {
			toast.error(error.message);

			inputRefs.current.forEach((input) => {
				if (input) input.value = "";
			});
		} finally {
			setIsVerifying(false);
		}
	};

	const handleVerifyEmail = async (e: FormEvent) => {
		e.preventDefault();
		const otpArray = inputRefs.current.map((e) => e?.value);
		const otpValue = otpArray.join("");

		verifyOtpCode(otpValue);
	};

	if (user?.isVerified) {
		return (
			<div className="min-h-[90vh] flex h-full justify-center items-center bg-gradient-to-br from-regular via-darkgreen to-regular">
				<div className=" flex flex-col justify-center items-center px-12 text-white text-center">
					<CheckCircle className="h-24 w-24 text-white mb-6" />
					<h1 className="text-4xl font-bold font-Montserrat mb-4">Email Verified!</h1>
					<p className="text-xl text-offwhite/90 mb-8">Your email has been successfully verified.</p>
					<Link
						to="/dashboard"
						className="text-background bg-offwhite  px-8 py-3 rounded-md dark:bg-background hover:bg-offwhite/85 dark:text-offwhite dark:hover:bg-background/85 duration-300">
						Back to dashboard
					</Link>
					{/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div> */}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col-reverse lg:flex-row">
			{/* LEFT SIDE/DOWN SIDE */}
			<div className="relative flex items-center py-20 px-4 bg-light text-foreground min-h-full border-r-[1px] border-foreground/10 dark:border-offwhite/10 lg:w-1/2 dark:text-offwhite dark:bg-foreground lg:px-20">
				<div className="flex gap-6 flex-col">
					<div className="flex flex-col items-center space-x-3 mb-6 md:flex-row">
						<img src={logo} alt="logo" className="w-20 h-20" />
						<span className="text-2xl font-bold font-Montserrat">Marcoby Pulse</span>
					</div>
					<div>
						<h1 className="text-xl font-bold mb-2 font-Poppins leading-tight">Almost There</h1>
						<p className="text-base mb-6 leading-relaxed">
							We've sent a verification code to your email. Enter it below to complete your account setup.
						</p>
					</div>

					<div className="flex flex-col gap-3 p-4 bg-background/5 max-w-[500px] rounded-md dark:bg-offwhite/5">
						<div className="flex justify-between gap-4 w-fit">
							<Mail className="h-5 w-5" />
							<h2 className="font-bold text-base mb-1">Check your email</h2>
						</div>
						<h3 className="font-semibold mb-1">
							We sent a 6-digit verification code to your email. The code will expire in 10 minutes.
						</h3>
						<p className="text-background/90 dark:text-offwhite/90">
							You can request a new code in 1 minute if you don't receive it.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						{verifyTodos.map(({ text }, index) => (
							<p key={index} className="text-background/90 dark:text-offwhite/90">
								• {text}
							</p>
						))}
					</div>
				</div>
				<div className="absolute top-20 right-20 w-32 h-32 bg-background/10 rounded-full blur-xl dark:bg-offwhite/10"></div>
				<div className="absolute bottom-20 right-32 w-24 h-24 bg-background/10 rounded-full blur-xl dark:bg-offwhite/10"></div>
				<div className="absolute top-1/2 right-10 w-16 h-16 bg-background/10 rounded-full blur-xl dark:bg-offwhite/10"></div>
			</div>

			{/* RIGHT SIDE/TOP SIDE  */}
			<div className="py-20 flex flex-col items-center justify-center px-4 bg-linear-to-br from-offwhite via-background/10 to-offwhite dark:from-foreground/10 dark:via-foreground/60 dark:to-foreground/10 lg:w-1/2">
				<div className="flex flex-col gap-1 justify-center items-center">
					<div className="p-5 rounded-full bg-darkgreen/10 w-fit h-fit">
						<Mail className="h-10 w-10" />
					</div>
					<h1 className="text-2xl font-bold font-Montserrat mb-2">Verify your email</h1>
				</div>
				<Card className="rounded-md py-10 bg-light dark:bg-foreground border-b-[1px] border-foreground/10 dark:border-offwhite/10">
					<CardHeader>
						<CardTitle className="font-Poppins">Enter the 6-digit code sent to your email</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-6">
						<form className="flex flex-col gap-6" onSubmit={handleVerifyEmail}>
							<InputOtp inputRefs={inputRefs} verifyOtpCode={verifyOtpCode} />
							<Button
								type="submit"
								className="w-full bg-regular/90 hover:bg-regular text-offwhite cursor-pointer"
								disabled={isVerifying}>
								{isVerifying ? <RefreshCw className="animate-spin h-8 w-8" /> : "Verify"}
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
			</div>
		</div>
	);
};

export default VerifyEmail;
