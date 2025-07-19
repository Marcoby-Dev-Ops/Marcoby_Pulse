import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import useAuthStore from "./stores/authStore";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
	const { getAuthState } = useAuthStore();

	useEffect(() => {
		getAuthState();
	}, []);
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path="/sign-up" element={<Signup />} />
				<Route path="/log-in" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/verify-email" element={<VerifyEmail />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
			</Route>
		</Routes>
	);
}

export default App;
