import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
	AlertTriangle,
	DollarSign,
	Eye,
	Package,
	Plus,
	ShoppingCart,
	TrendingDown,
	TrendingUp,
	Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";

const stats = [
	{
		title: "Total Revenue",
		value: "$45,231.89",
		change: "+20.1%",
		trend: "up",
		icon: <DollarSign />,
	},
	{
		title: "Total Users",
		value: "2,350",
		change: "+180.1%",
		trend: "up",
		icon: <Users />,
	},
	{
		title: "Total Orders",
		value: "12,234",
		change: "+19%",
		trend: "up",
		icon: <ShoppingCart />,
	},
	{
		title: "Active Products",
		value: "573",
		change: "+201",
		trend: "up",
		icon: <Package />,
	},
];

const recentOrders = [
	{
		id: "ORD-001",
		customer: "John Doe",
		email: "john@example.com",
		product: "VPS Pro",
		amount: "$29.99",
		status: "completed",
		date: "2024-01-15",
	},
	{
		id: "ORD-002",
		customer: "Jane Smith",
		email: "jane@example.com",
		product: "Dedicated Server",
		amount: "$199.99",
		status: "pending",
		date: "2024-01-15",
	},
	{
		id: "ORD-003",
		customer: "Bob Johnson",
		email: "bob@example.com",
		product: "VPS Basic",
		amount: "$9.99",
		status: "processing",
		date: "2024-01-14",
	},
	{
		id: "ORD-004",
		customer: "Alice Brown",
		email: "alice@example.com",
		product: "Cloud Storage",
		amount: "$19.99",
		status: "completed",
		date: "2024-01-14",
	},
];

const lowStockProducts = [
	{ name: "VPS Basic", stock: 2, threshold: 10 },
	{ name: "Dedicated Server", stock: 1, threshold: 5 },
	{ name: "SSL Certificate", stock: 3, threshold: 15 },
];

const Dashboard = () => {
	return (
		<div className="p-5 flex flex-col gap-5">
			{/* -------- DashBoard Header ------------ */}
			<div className="flex flex-col gap-4 justify-between lg:flex-row lg:items-center">
				<div>
					<h1 className="text-3xl font-bold font-Montserrat text-black/90 dark:text-offwhite/80">Dashboard</h1>
					<p className="text-lightbackground dark:text-offwhite/75 ">
						Welcome back! Here's what's happening with your store.
					</p>
				</div>
				<div className="flex gap-3">
					<Link to="/add-product">
						<Button className="bg-regular hover:bg-regular/80">
							<Plus className="h-4 w-4 mr-2" />
							Add Product
						</Button>
					</Link>
					<Link to="/orders">
						<Button variant="outline">
							<Eye className="h-4 w-4 mr-2" />
							View Orders
						</Button>
					</Link>
				</div>
			</div>

			{/* ------------------ Statistics Card ---------------- */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat) => (
					<Card key={stat.title} className="gap-0">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="font-medium text-black/90 dark:text-offwhite/80">{stat.title}</CardTitle>
							<>{stat.icon}</>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold dark:text-offwhite/90">{stat.value}</div>
							<div className="flex items-center text-xs text-slate-600">
								{stat.trend === "up" ? (
									<TrendingUp className="h-3 w-3 text-green-600 mr-1" />
								) : (
									<TrendingDown className="h-3 w-3 text-red-600 mr-1" />
								)}
								<span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
								<span className="ml-1">from last month</span>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* --------------- Recent Activity & Low Stock Alert */}
			<div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{/* Recent Orders */}
				<Card className="col-span-1 lg:col-span-2">
					<CardHeader>
						<CardTitle>Recent Orders</CardTitle>
						<CardDescription>Latest orders from your customers</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Order</TableHead>
									<TableHead>Customer</TableHead>
									<TableHead>Product</TableHead>
									<TableHead>Amount</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{recentOrders.map((order) => (
									<TableRow key={order.id}>
										<TableCell className="font-medium">{order.id}</TableCell>
										<TableCell>
											<div>
												<div className="font-medium">{order.customer}</div>
												<div className="text-sm text-slate-600">{order.email}</div>
											</div>
										</TableCell>
										<TableCell>{order.product}</TableCell>
										<TableCell>{order.amount}</TableCell>
										<TableCell>
											<Badge
												variant={
													order.status === "completed"
														? "default"
														: order.status === "pending"
														? "secondary"
														: "outline"
												}
												className={
													order.status === "completed"
														? "bg-green-100 text-green-800"
														: order.status === "pending"
														? "bg-yellow-100 text-yellow-800"
														: "bg-blue-100 text-blue-800"
												}>
												{order.status}
											</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{/* -------------- Low Stock Alert ---------------- */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center">
							<AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
							Low Stock Alert
						</CardTitle>
						<CardDescription>Products running low on inventory</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{lowStockProducts.map((product) => (
								<div key={product.name} className="flex items-center justify-between">
									<div>
										<p className="font-medium font-Montserrat text-black/90 dark:text-offwhite/80">{product.name}</p>
										<p className="text-black/80 dark:text-offwhite/70">
											{product.stock} left (min: {product.threshold})
										</p>
									</div>
									<Badge variant="destructive">Low Stock</Badge>
								</div>
							))}
						</div>
						<Link to="/products">
							<Button variant="outline" className="w-full mt-4 bg-transparent">
								Manage Inventory
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
