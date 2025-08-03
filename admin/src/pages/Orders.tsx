import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { CheckCircle, Eye, MoreHorizontal, Search, XCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const mockOrders = [
	{
		id: "ORD001",
		customerName: "Alice Smith",
		date: "2024-07-25",
		total: 29.99,
		status: "Completed",
		items: [{ name: "VPS Pro", quantity: 1, price: 29.99 }],
	},
	{
		id: "ORD002",
		customerName: "Bob Johnson",
		date: "2024-07-24",
		total: 199.99,
		status: "Processing",
		items: [{ name: "Dedicated Server", quantity: 1, price: 199.99 }],
	},
	{
		id: "ORD003",
		customerName: "Charlie Brown",
		date: "2024-07-23",
		total: 12.99,
		status: "Completed",
		items: [{ name: ".com Domain", quantity: 1, price: 12.99 }],
	},
	{
		id: "ORD004",
		customerName: "Diana Prince",
		date: "2024-07-22",
		total: 49.99,
		status: "Cancelled",
		items: [{ name: "SSL Certificate", quantity: 1, price: 49.99 }],
	},
	{
		id: "ORD005",
		customerName: "Eve Adams",
		date: "2024-07-21",
		total: 99.99,
		status: "Completed",
		items: [{ name: "Productivity Suite", quantity: 1, price: 99.99 }],
	},
];

const Orders = () => {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [orders, setOrders] = React.useState(mockOrders);

	const filteredOrders = orders.filter((order) => {
		const searched = searchQuery.toLowerCase();
		return (
			order.customerName.toLowerCase().includes(searched) ||
			order.id.toLowerCase().includes(searched) ||
			order.status.toLowerCase().includes(searched)
		);
	});

	const updateOrderStatus = (orderId: string, newStatus: string) => {
		setOrders((prevOrder) =>
			prevOrder.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
		);

		toast.success(`Order ${orderId} status changed to ${newStatus}.`);
	};

	const getStatusVariant = (status: string) => {
		switch (status) {
			case "Completed":
				return "default";
			case "Processing":
				return "secondary";
			case "Cancelled":
				return "destructive";
			default:
				return "outline";
		}
	};

	return (
		<div className="p-5 flex flex-col gap-5">
			{/* -------- Orders Header ------------ */}
			<div className="flex flex-col gap-4 justify-between lg:flex-row lg:items-center">
				<div>
					<h1 className="text-3xl font-bold font-Montserrat text-black/90 dark:text-offwhite/80">Orders</h1>
					<p className="text-lightbackground dark:text-offwhite/75">Manage customer orders and their statuses.</p>
				</div>
			</div>

			{/* ------------ Orders List Card ---------- */}
			<Card>
				<CardHeader>
					<CardTitle>Order List</CardTitle>
					<CardDescription>A list of all customer orders.</CardDescription>
				</CardHeader>
				<CardContent>
					{/* ----------- Search Bar ------------- */}
					<div className="relative mb-4 max-w-xl w-full">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search orders..."
							className="w-full rounded-lg bg-background pl-8"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					{/* ------------- Order List Table ------------- */}

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Order ID</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Total</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="w-[50px] text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredOrders.length > 0 ? (
								filteredOrders.map((order) => (
									<TableRow key={order.id}>
										<TableCell className="font-medium">{order.id}</TableCell>
										<TableCell>{order.customerName}</TableCell>
										<TableCell>{order.date}</TableCell>
										<TableCell>${order.total.toFixed(2)}</TableCell>
										<TableCell>
											<Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
										</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button aria-haspopup="true" size="icon" variant="ghost">
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem asChild>
														<Link to={`/admin/orders/${order.id}`} className="flex items-center">
															<Eye className="mr-2 h-4 w-4" /> View Details
														</Link>
													</DropdownMenuItem>
													{order.status !== "Completed" && (
														<DropdownMenuItem
															onClick={() => updateOrderStatus(order.id, "Completed")}
															className="flex items-center">
															<CheckCircle className="mr-2 h-4 w-4" /> Mark as Completed
														</DropdownMenuItem>
													)}
													{order.status !== "Cancelled" && (
														<DropdownMenuItem
															onClick={() => updateOrderStatus(order.id, "Cancelled")}
															className="flex items-center text-destructive">
															<XCircle className="mr-2 h-4 w-4" /> Mark as Cancelled
														</DropdownMenuItem>
													)}
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={6} className="text-center py-8 ">
										No orders found.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default Orders;
