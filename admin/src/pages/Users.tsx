import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Edit, MoreHorizontal, Search, Trash2 } from "lucide-react";
import { Input } from "../components/ui/input";
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

const mockUsers = [
	{
		id: "USR001",
		name: "John Doe",
		email: "john.doe@example.com",
		role: "admin",
		status: "Active",
		registered: "2023-01-15",
	},
	{
		id: "USR002",
		name: "Jane Smith",
		email: "jane.smith@example.com",
		role: "user",
		status: "Active",
		registered: "2023-02-20",
	},
	{
		id: "USR003",
		name: "Peter Jones",
		email: "peter.jones@example.com",
		role: "user",
		status: "Inactive",
		registered: "2023-03-10",
	},
	{
		id: "USR004",
		name: "Mary Brown",
		email: "mary.brown@example.com",
		role: "user",
		status: "Active",
		registered: "2023-04-01",
	},
	{
		id: "USR005",
		name: "Admin User",
		email: "admin@example.com",
		role: "admin",
		status: "Active",
		registered: "2022-11-01",
	},
];

const Users = () => {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [users, setUsers] = React.useState(mockUsers);

	const filteredUsers = users.filter((user) => {
		const searched = searchQuery.toLowerCase();
		return (
			user.name.toLowerCase().includes(searched) ||
			user.email.toLowerCase().includes(searched) ||
			user.role.toLowerCase().includes(searched)
		);
	});

	const handleDelete = (userId: string) => {
		setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
		toast.success(`User ${userId} has been removed.`);
	};

	const getStatusVariant = (status: string) => {
		return status === "Active" ? "default" : "secondary";
	};

	return (
		<div className="p-5 flex flex-col gap-5">
			{/* -------- UserPage Header ------------ */}
			<div className="flex flex-col gap-4 justify-between lg:flex-row lg:items-center">
				<div>
					<h1 className="text-3xl font-bold font-Montserrat text-black/90 dark:text-offwhite/80">Users List</h1>
					<p className="text-lightbackground dark:text-offwhite/75">Manage registered users and their roles.</p>
				</div>
			</div>

			{/* ------------ Users List Card ---------- */}
			<Card>
				<CardHeader>
					<CardTitle>User List</CardTitle>
					<CardDescription>A list of all registered users.</CardDescription>
				</CardHeader>
				<CardContent>
					{/* ----------- Search Bar ------------- */}
					<div className="relative mb-4 max-w-xl w-full">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search users..."
							className="w-full rounded-lg bg-background pl-8"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					{/* ------------- User List Table ------------- */}

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>User ID</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Registered Date</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredUsers.length > 0 ? (
								filteredUsers.map((user) => (
									<TableRow key={user.id}>
										<TableCell className="font-medium">{user.id}</TableCell>
										<TableCell>{user.name}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>
											<Badge variant={user.role === "admin" ? "default" : "outline"}>{user.role}</Badge>
										</TableCell>
										<TableCell>
											<Badge variant={getStatusVariant(user.status)}>{user.status}</Badge>
										</TableCell>
										<TableCell>{user.registered}</TableCell>
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
														<Link to={`/admin/users/edit/${user.id}`} className="flex items-center">
															<Edit className="mr-2 h-4 w-4" /> Edit
														</Link>
													</DropdownMenuItem>

													<DropdownMenuItem
														onClick={() => handleDelete(user.id)}
														className="flex items-center text-destructive">
														<Trash2 className="mr-2 h-4 w-4" /> Delete
													</DropdownMenuItem>
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

export default Users;
