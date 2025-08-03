import { useState, type FormEvent } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import useAdminAuthStore from "../stores/adminAuthStore";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const { isLoading, login } = useAdminAuthStore();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const { success, message } = await login(formData);
		if (success) {
			toast.success(message);
			navigate("/dashboard");
		} else {
			toast.error(message);
		}
	};

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className="h-screen w-full px-4 flex items-center justify-center">
			<Card className="rounded-md gap-8 bg-light dark:bg-lightbackground max-w-[500px] mx-auto w-full border-b-[1px] border-lightbackground/10 dark:border-offwhite/10">
				<CardHeader>
					<CardTitle className="font-Montserrat">Sign In</CardTitle>
					<CardDescription className="text-black/70 dark:text-offwhite/70">Welcome to the Admin Panel</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="space-y-4" onSubmit={handleSubmit}>
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
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="Enter your password"
								value={formData.password}
								onChange={(e) => handleChange("password", e.target.value)}
							/>
						</div>
						<Button
							type="submit"
							className="w-full my-3 bg-regular/90 hover:bg-regular text-offwhite cursor-pointer"
							disabled={isLoading}>
							{isLoading ? <Loader className="animate-spin h-6 w-6" /> : "Sign In"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
