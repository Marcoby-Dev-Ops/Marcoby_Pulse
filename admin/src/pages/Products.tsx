import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import {
	BadgeDollarSign,
	Edit,
	Eye,
	Info,
	MoreHorizontal,
	Package,
	Plus,
	Search,
	SquareActivity,
	Trash2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select } from "@radix-ui/react-select";
import { Input } from "../components/ui/input";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { TableBody, Table, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";

const products = [
	{
		id: "1",
		name: "VPS Basic",
		category: "VPS Hosting",
		price: 9.99,
		stock: 25,
		status: "active",
		sales: 156,
		image: "/placeholder.svg?height=40&width=40",
		createdAt: "2024-01-10",
	},
	{
		id: "2",
		name: "VPS Pro",
		category: "VPS Hosting",
		price: 29.99,
		stock: 18,
		status: "active",
		sales: 89,
		image: "/placeholder.svg?height=40&width=40",
		createdAt: "2024-01-08",
	},
	{
		id: "3",
		name: "Dedicated Server",
		category: "Dedicated Hosting",
		price: 199.99,
		stock: 5,
		status: "active",
		sales: 23,
		image: "/placeholder.svg?height=40&width=40",
		createdAt: "2024-01-05",
	},
	{
		id: "4",
		name: "SSL Certificate",
		category: "Security",
		price: 49.99,
		stock: 0,
		status: "out_of_stock",
		sales: 67,
		image: "/placeholder.svg?height=40&width=40",
		createdAt: "2024-01-03",
	},
	{
		id: "5",
		name: "Domain Registration",
		category: "Domains",
		price: 12.99,
		stock: 100,
		status: "active",
		sales: 234,
		image: "/placeholder.svg?height=40&width=40",
		createdAt: "2024-01-01",
	},
];

const stats = [
	{
		title: "Total Products",
		statNumber: products.length,
		icon: <Package className="h-8 w-8 text-blue-600" />,
	},
	{
		title: "Active Products",
		statNumber: products.filter((item) => item.status === "active").length,
		icon: <SquareActivity className="h-8 w-8 text-regular" />,
	},
	{
		title: "Out of stock",
		statNumber: products.filter((item) => item.stock === 0).length,
		icon: <Info className="h-8 w-8 text-red-500" />,
	},
	{
		title: "Total Sales",
		statNumber: products.reduce((sum, item) => sum + item.sales, 0),
		icon: <BadgeDollarSign className="h-8 w-8 text-amber-200" />,
	},
];

const Products = () => {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [categoryFilter, setCategoryFilter] = React.useState("all");
	const [statusFilter, setStatusFilter] = React.useState("all");
	const [selectedProduct, setSelectedProduct] = React.useState(null);
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const filteredProducts = products.filter((item) => {
		const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
		const matchesStatus = statusFilter === "all" || item.status === statusFilter;
		return matchesSearch && matchesCategory && matchesStatus;
	});

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "active":
				return <Badge className="bg-green-100 text-green-800">Active</Badge>;
			case "out_of_stock":
				return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
			case "draft":
				return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
			default:
				return <Badge variant="secondary">{status}</Badge>;
		}
	};

	const getStockStatus = (stock: number) => {
		if (stock === 0) return "text-red-600";
		if (stock < 10) return "text-orange-600";
		return "text-green-600";
	};

	return (
		<div className="p-5 flex flex-col gap-5">
			{/* -------- Products Page Header ------------ */}
			<div className="flex flex-col gap-4 justify-between lg:flex-row lg:items-center">
				<div>
					<h1 className="text-3xl font-bold font-Montserrat text-black/90 dark:text-offwhite/80">Products</h1>
					<p className="text-lightbackground dark:text-offwhite/75 ">Manage your product catalog.</p>
				</div>
				<div className="flex gap-3">
					<Link to="/products">
						<Button className="bg-regular hover:bg-regular/80">
							<Plus className="h-4 w-4 mr-2" />
							Add Product
						</Button>
					</Link>
				</div>
			</div>

			{/* -------------- Statics Card --------------- */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{stats.map(({ title, statNumber, icon }) => (
					<Card key={title}>
						<CardContent>
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-slate-">{title}</p>
									<p className="text-2xl font-bold">{statNumber}</p>
								</div>
								{icon}
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* -------- Filtered Products Card */}
			<Card>
				<CardHeader>
					<CardTitle className="font-Montserrat text-xl">Product Catalog</CardTitle>
					<CardDescription>View and manage all your products</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
						{/* ------ Search Bar --------- */}
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
							<Input
								placeholder="Search products..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10"
							/>
						</div>

						<Select value={categoryFilter} onValueChange={setCategoryFilter}>
							{/* ------- Category Filter -------- */}
							<SelectTrigger className="w-full ">
								<SelectValue placeholder="Category" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Categories</SelectItem>
								<SelectItem value="VPS Hosting">VPS Hosting</SelectItem>
								<SelectItem value="Dedicated Hosting">Dedicated Hosting</SelectItem>
								<SelectItem value="Security">Security</SelectItem>
								<SelectItem value="Domains">Domains</SelectItem>
							</SelectContent>
						</Select>

						{/* ------ Status Filter -------- */}
						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="out_of_stock">Out of Stock</SelectItem>
								<SelectItem value="draft">Draft</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* --------- Filtered Products ----------- */}
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Product</TableHead>
									<TableHead>Category</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Stock</TableHead>
									<TableHead>Sales</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredProducts.map((product) => (
									<TableRow key={product.id}>
										<TableCell>
											<div className="flex items-center space-x-3">
												<img
													src={product.image || "/placeholder.svg"}
													alt={product.name}
													className="w-10 h-10 rounded-lg object-cover"
												/>
												<div>
													<p className="font-medium text-black/90 dark:text-offwhite/80">{product.name}</p>
													<p className="text-black/80 dark:text-offwhite/70">ID: {product.id}</p>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<Badge variant="outline" className="text-black/70 dark:text-offwhite/70">
												{product.category}
											</Badge>
										</TableCell>
										<TableCell className="font-medium">${product.price}</TableCell>
										<TableCell>
											<span className={getStockStatus(product.stock)}>{product.stock} units</span>
										</TableCell>
										<TableCell>{product.sales} sold</TableCell>
										<TableCell>{getStatusBadge(product.status)}</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" className="h-8 w-8 p-0">
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<DropdownMenuItem
														onClick={() => {
															setIsModalOpen(true);
															setSelectedProduct(product);
														}}>
														<Eye className="mr-2 h-4 w-4" />
														View Details
													</DropdownMenuItem>
													<DropdownMenuItem>
														<Edit className="mr-2 h-4 w-4" />
														Edit Product
													</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem className="text-red-600">
														<Trash2 className="mr-2 h-4 w-4" />
														Delete Product
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>

					{/* -------------- View Details Dialog ---------- */}
					<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
						<DialogTrigger asChild></DialogTrigger>
						<DialogContent className="sm:max-w-md">
							{/*
							<DialogHeader>
								 <DialogTitle>{selectedProduct?.name}</DialogTitle>
								<DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
							</DialogHeader>
							<div className="flex items-center gap-2">
								<div className="grid flex-1 gap-2">
									<Label htmlFor="link" className="sr-only">
										Link
									</Label>
									<Input id="link" defaultValue="https://ui.shadcn.com/docs/installation" readOnly />
								</div>
							</div> */}
							<DialogFooter className="sm:justify-start">
								<DialogClose asChild>
									<Button type="button" variant="secondary">
										Close
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					{filteredProducts.length === 0 && (
						<div className="text-center py-8">
							<Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium text-lightbackground dark:text-offwhite/90 mb-2">No products found</h3>
							<p className="text-lightbackground dark:text-offwhite/75 mb-4">
								Try adjusting your search or filter criteria.
							</p>
							<Link to="/add-products">
								<Button>Add Your First Product</Button>
							</Link>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Products;
