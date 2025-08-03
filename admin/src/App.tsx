import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import useAdminAuthStore from "./stores/adminAuthStore";
import AddProduct from "./pages/AddProduct";
import Header from "./components/Header";
import { SidebarProvider, SidebarInset } from "./components/ui/sidebar";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Product from "./pages/Product";
import Order from "./pages/Order";

function App() {
	const { token } = useAdminAuthStore();
	return (
		<div className="font-QuickSand">
			<Toaster />
			{token === null ? (
				<Login />
			) : (
				<SidebarProvider>
					<SideBar />
					<SidebarInset>
						<Header />
						<Routes>
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/products" element={<Products />} />
							<Route path="/add-product" element={<AddProduct />} />
							<Route path="/orders" element={<Orders />} />
							<Route path="/users" element={<Users />} />
							<Route path="/product/:productId" element={<Product />} />
							<Route path="/order/:orderId" element={<Order />} />
						</Routes>
					</SidebarInset>
				</SidebarProvider>
			)}
		</div>
	);
}

export default App;
