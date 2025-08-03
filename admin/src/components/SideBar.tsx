import React, { useEffect } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "./ui/sidebar";
import logo from "../assets/images/logo.png";
import useAdminAuthStore from "../stores/adminAuthStore";
import { LayoutDashboard, LogOut, PackageOpen, Plus, ShoppingBasket, Users, type LucideProps } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SideBarDataProps {
	title: string;
	icon: LucideProps;
	href: string;
}

const data: SideBarDataProps[] = [
	{
		title: "Dashboard",
		icon: <LayoutDashboard className=" text-regular" />,
		href: "/dashboard",
	},
	{
		title: "Products",
		icon: <PackageOpen className="text-blue-500" />,
		href: "/products",
	},
	{
		title: "Add Product",
		icon: <Plus className="text-amber-500" />,
		href: "/add-product",
	},
	{
		title: "Orders",
		icon: <ShoppingBasket className="text-cyan-400" />,
		href: "/orders",
	},
	{
		title: "Users",
		icon: <Users className="text-yellow-800" />,
		href: "/users",
	},
];

const SideBar = () => {
	const { setToken } = useAdminAuthStore();
	const { open, setOpenMobile } = useSidebar();
	const pathname = useLocation().pathname;
	const navigate = useNavigate();

	useEffect(() => {
		setOpenMobile(false);
	}, [pathname]);

	return (
		<Sidebar
			collapsible="icon"
			className={"border-r-[1px] border-lightbackground/10 dark:border-offwhite/10 bg-blue-50 dark:bg-lightbackground"}>
			<SidebarHeader className="flex-row items-center gap-4 border-b">
				<div className="h-12 w-12">
					<img src={logo} alt="logo" />
				</div>
				<h1
					className={`font-Montserrat font-semibold text-lightbackground/70 dark:text-offwhite/75 ${
						!open && "hidden"
					}`}>
					Admin Panel
				</h1>
			</SidebarHeader>

			<SidebarContent>
				<SidebarMenu className="px-3 py-5">
					{data.map(({ title, icon, href }) => (
						<SidebarMenuItem key={href}>
							<SidebarMenuButton asChild isActive={pathname === href}>
								<Link to={href} className="font-QuickSand font-medium">
									<>{icon}</>
									{title}
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>

			<SidebarFooter className="border-t">
				<div
					className={`flex items-center justify-center gap-3 w-full cursor-pointer rounded-md ${
						!open && "hover:bg-black/5 dark:hover:bg-offwhite/5 px-2"
					}`}
					onClick={() => {
						setToken(null);
						navigate("/");
					}}>
					<LogOut className="text-red-500" />
					{open && "Log Out"}
				</div>
			</SidebarFooter>
		</Sidebar>
	);
};

export default SideBar;
