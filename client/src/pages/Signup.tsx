import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Checkbox } from "../components/ui/checkbox";
import useAuthStore from "../stores/authStore";
import { toast } from "react-hot-toast";
import { useNetworkStatus } from "../hooks/NetworkStatus";
import FeatureAuthDisplay from "../components/FeatureAuthDisplay";
import { Loader } from "lucide-react";

const Signup = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		companyName: "",
		DOB: "",
		password: "",
		confirmPassword: "",
		agreeToTerms: false,
	});
	const navigate = useNavigate();
	const isOnline = useNetworkStatus();
	const { createUser, isLoading } = useAuthStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isOnline) {
			const { success, message } = await createUser(formData);

			if (success) {
				toast.success(message);
				navigate("/log-in");
			} else {
				toast.error(message);
			}
		} else {
			toast.error("Error! You are not connected to internet");
		}
	};
	const handleInputChange = (field: string, value: string | boolean) => {
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
						<h1 className="text-2xl font-bold font-Montserrat mb-2">Create your account</h1>
						<p className="font-Poppins">Start your digital commerce journey today</p>
					</div>

					<Card className="rounded-md bg-light dark:bg-foreground border-b-[1px] border-foreground/10 dark:border-offwhite/10">
						<CardHeader>
							<CardTitle className="font-Montserrat">Sign Up</CardTitle>
							<CardDescription className="text-background/70 dark:text-offwhite/70">
								Create your account to get started with Pulse
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="firstName">First Name</Label>
										<Input
											id="firstName"
											placeholder="John"
											value={formData.firstName}
											onChange={(e) => handleInputChange("firstName", e.target.value)}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="lastName">Last Name</Label>
										<Input
											id="lastName"
											placeholder="Doe"
											value={formData.lastName}
											onChange={(e) => handleInputChange("lastName", e.target.value)}
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="john@company.com"
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="phoneNumber">Phone Number</Label>
									<div className="flex">
										<div className="flex items-center px-3 border-[1px] border-solid border-foreground/10 dark:border-offwhite/10 border-r-0 rounded-l-md">
											<span className="text-sm text-slate-600">+1</span>
										</div>
										<Input
											id="phoneNumber"
											type="tel"
											placeholder="(555) 123-4567"
											value={formData.phoneNumber}
											onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
											className="rounded-l-none"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="company">Company</Label>
									<Input
										id="companyName"
										placeholder="Your Company"
										value={formData.companyName}
										onChange={(e) => handleInputChange("companyName", e.target.value)}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="dateOfBirth">Date of Birth</Label>
									<Input
										id="DOB"
										type="date"
										value={formData.DOB}
										onChange={(e) => handleInputChange("DOB", e.target.value)}
										max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
									/>
									<p className="text-xs text-slate-500">You must be 18 years or older to create an account</p>
								</div>
								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										type="password"
										placeholder="Create a strong password"
										value={formData.password}
										onChange={(e) => handleInputChange("password", e.target.value)}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="confirmPassword">Confirm Password</Label>
									<Input
										id="confirmPassword"
										type="password"
										placeholder="Confirm your password"
										value={formData.confirmPassword}
										onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
									/>
								</div>
								<div className="flex items-center space-x-3">
									<Checkbox
										id="terms"
										checked={formData.agreeToTerms}
										onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
									/>
									<Label htmlFor="terms" className="text-sm block">
										I agree to the{" "}
										<Link to="/terms" className="text-darkgreen hover:underline">
											Terms of Service
										</Link>{" "}
										and{" "}
										<Link to="/privacy" className="text-darkgreen hover:underline">
											Privacy Policy
										</Link>
									</Label>
								</div>
								<Button
									type="submit"
									className="w-full bg-regular/90 hover:bg-regular text-offwhite cursor-pointer"
									disabled={!formData.agreeToTerms || isLoading}>
									{isLoading ? <Loader className="animate-spin h-6 w-6" /> : "Create Account"}
								</Button>
							</form>

							<Separator className="my-6" />

							<div className="text-center">
								<p className="font-medium">
									Already have an account?{" "}
									<Link to="/log-in" className="text-darkgreen hover:underline font-semibold">
										Log in
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

export default Signup;
