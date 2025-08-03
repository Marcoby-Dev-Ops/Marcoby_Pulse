import { HelpCircle, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { SidebarTrigger } from "./ui/sidebar";
import { Input } from "./ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";

	return (
		<header className="relative flex gap-6 px-4 items-center justify-between h-16 min-w-full bg-background border-b-[1px] border-b-lightbackground/10 dark:border-b-offwhite/10">
			{/* ----- SideBar Trigger ------ */}
			<div className="max-w-lg mr-auto w-full flex gap-6 items-center">
				<SidebarTrigger className="text-lightbackground/70 dark:text-offwhite/75" />
				<div className="relative w-full">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-lightbackground/70 dark:text-offwhite/75" />
					<Input
						type="text"
						placeholder="Search products, orders, customers..."
						// value={searchQuery}
						// onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-10 bg-slate-50 border-slate-200 focus:bg-white"
					/>
				</div>
			</div>

			{/* -------- Theme Button ----------- */}
			<div className="flex gap-4">
				<div onClick={toggleTheme} className="cursor-pointer">
					{isDark ? (
						<Sun className="w-4 h-4 text-lightbackground/70 dark:text-offwhite/75" />
					) : (
						<Moon className="w-4 h-4 text-lightbackground/70 dark:text-offwhite/75" />
					)}
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<HelpCircle className="h-4 w-4 ext-lightbackground/70 dark:text-offwhite/75" />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="dark:bg-lightbackground">
						<DropdownMenuLabel>Help & Support</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Documentation</DropdownMenuItem>
						<DropdownMenuItem>Contact Support</DropdownMenuItem>
						<DropdownMenuItem>Keyboard Shortcuts</DropdownMenuItem>
						<DropdownMenuItem>What's New</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};

export default Header;
