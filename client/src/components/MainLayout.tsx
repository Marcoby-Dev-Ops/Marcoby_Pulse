import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
	return (
		<div className="relative text-sm font-QuickSand flex flex-col min-h-screen">
			<NavBar />
			<Toaster />
			<div className="relative right-0 left-0 -z-50 h-20 bg-transparent"></div>
			<Outlet />
			<Footer />
		</div>
	);
};

export default MainLayout;
