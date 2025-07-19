import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import useAuthStore from "../stores/authStore";
import toast from "react-hot-toast";
import { useNetworkStatus } from "../hooks/NetworkStatus";
import { Link, useNavigate } from "react-router-dom";
import FeatureAuthDisplay from "../components/FeatureAuthDisplay";
import { Loader } from "lucide-react";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [message, setMessage] = useState("");
	const { login, isLoading, isMessageError } = useAuthStore();
	const navigate = useNavigate();
	const isOnline = useNetworkStatus();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (isOnline) {
			const { success, message } = await login(formData);

			if (success) {
				toast.success(message);
				navigate("/dashboard");
			} else {
				setMessage(message);
			}
		} else {
			toast.error("Error! You are not connected to internet");
		}
	};

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className="flex flex-col-reverse lg:flex-row">
			{/* LEFT SIDE */}
			<FeatureAuthDisplay />
			{/* RIGHT SIDE */}
			<div className="py-20 flex items-center justify-center px-4 bg-linear-to-br from-offwhite via-background/10 to-offwhite dark:from-foreground/10 dark:via-foreground/60 dark:to-foreground/10 lg:w-1/2">
				<div className="w-full max-w-md">
					<div className="text-center mb-8">
						<h1 className="text-2xl font-bold font-Montserrat mb-2">Welcome back</h1>
						<p className="font-Poppins">Sign in to your account to continue</p>
					</div>

					<Card className="rounded-md bg-light dark:bg-foreground border-b-[1px] border-foreground/10 dark:border-offwhite/10">
						<CardHeader>
							<CardTitle className="font-Montserrat">Sign In</CardTitle>
							<CardDescription className="text-background/70 dark:text-offwhite/70">
								Enter your email and password to access your account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-4">
								{isMessageError && !message.includes("password") && (
									<p className="text-red-500 font-semibold">{message}</p>
								)}
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="Enter your email"
										value={formData.email}
										onChange={(e) => handleChange("email", e.target.value)}
									/>
								</div>
								<div className="space-y-2">
									{isMessageError && message.includes("password") && (
										<p className="text-red-500 font-semibold">{message}</p>
									)}
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										type="password"
										placeholder="Enter your password"
										value={formData.password}
										onChange={(e) => handleChange("password", e.target.value)}
									/>
								</div>
								<div className="flex items-center justify-between">
									<Link to="/forgot-password" className="text-sm text-darkgreen font-semibold hover:underline">
										Forgot password?
									</Link>
								</div>
								<Button
									type="submit"
									className="w-full bg-regular/90 hover:bg-regular text-offwhite cursor-pointer"
									disabled={isLoading}>
									{isLoading ? <Loader className="animate-spin h-6 w-6" /> : "Sign In"}
								</Button>
							</form>

							<Separator className="my-6" />

							<div className="text-center">
								<p className="font-medium">
									Don't have an account?{" "}
									<Link to="/sign-up" className="text-darkgreen font-semibold hover:underline">
										Sign up
									</Link>
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Login;
