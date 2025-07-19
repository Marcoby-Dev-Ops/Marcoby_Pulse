import { useState } from "react";
import logo from "../assets/images/logo.png";
import { navItems, type NavListProps } from "../constants/navItems";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, LogOut } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import {
	ListItem,
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "../components/ui/navigation-menu";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";
import useAuthStore from "../stores/authStore";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const linkClass =
	"inline-flex gap-2 font-semibold w-full rounded-md py-2 px-4 justify-start text-left bg-transparent shadow-none text-darkgreen  hover:bg-background/5 dark:hover:bg-offwhite/5";

const NavBar = () => {
	const navigate = useNavigate();
	const [isMenuShown, setIsMenuShown] = useState<boolean>(false);
	const handleMenuShow = () => {
		setIsMenuShown(!isMenuShown);
	};

	const { user, userData } = useUserStore();
	const { logout, isLoggedIn, sendVerificationOtp } = useAuthStore();

	const handleSendOtp = async () => {
		const { success, message } = await sendVerificationOtp();
		if (success) {
			toast.success(message);
			navigate("/verify-email");
		} else {
			toast.error(message);
		}
	};

	const handleLogout = async () => {
		const { success, message } = await logout();
		if (success) {
			navigate("/log-in");
		} else {
			toast.error(message);
		}
	};

	return (
		<nav className="fixed right-0 left-0 z-50 bg-offwhite px-5 flex items-center justify-between shadow-sm dark:bg-black dark:border-b-[1px] dark:border-offwhite/10 lg:backdrop-blur-2xl lg:bg-white/50 lg:dark:bg-black/50">
			<Link to="/" className="relative h-20 w-20">
				<img src={logo} alt="logo" />
			</Link>
			<ThemeBtn />
			<NavLinks />
			<HamburgerMenu isMenuShown={isMenuShown} />
			<HamburgerMenuIcon isMenuShown={isMenuShown} handleMenuShow={handleMenuShow} />

			{user && isLoggedIn ? (
				<NavigationMenu viewport={false} className="hidden lg:flex">
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger className="ml-6 bg-regular p-2 text-3xl text-offwhite rounded-full font-bold font-Montserrat">
								<p>{userData && `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`} </p>
							</NavigationMenuTrigger>
							<NavigationMenuContent className="flex flex-col bg-light dark:bg-foreground border-b-[1px] border-foreground/10 dark:border-offwhite/10 md:right-0 lg:right-20">
								<Link to="/dashboard" className={`${linkClass}`}>
									Dashboard
								</Link>
								<Button className={`${linkClass} ${user.isVerified ? "hidden" : "block"} `} onClick={handleSendOtp}>
									Verify Email
								</Button>
								<Button className={`${linkClass} text-red-500`} onClick={handleLogout}>
									Log out
								</Button>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			) : (
				<div className="hidden lg:flex items-center justify-between gap-3 ml-6 xl:ml-8">
					<Link
						to="/log-in"
						className="rounded-md bg-transparent px-3 py-2 border-[1px] border-foreground/20 dark:border-offwhite/20">
						Log in
					</Link>
					<Link to="/sign-up" className="rounded-md bg-darkgreen px-3 py-2">
						Sign up
					</Link>
				</div>
			)}
		</nav>
	);
};

const ThemeBtn = () => {
	const { theme, toggleTheme } = useTheme();

	const isDark = theme === "dark";

	return (
		<div className="ml-auto mr-6 relative z-50 flex items-center space-x-2">
			<Sun className="w-4 h-4 xl:hidden text-foreground/70 dark:text-offwhite/75" />
			<Switch id="dark-mode" checked={isDark} onCheckedChange={toggleTheme} />
			<Label htmlFor="dark-mode" className="hidden xl:block">
				Dark Mode
			</Label>
			<Moon className="w-4 h-4 xl:hidden text-foreground/70 dark:text-offwhite/75" />
		</div>
	);
};

const NavLinks = () => {
	return (
		<NavigationMenu viewport={false} className="hidden lg:block">
			<NavigationMenuList className="flex gap-6 xl:gap-8">
				{navItems.map((item: NavListProps) => {
					return (
						<NavigationMenuItem key={item.label}>
							{item.dropdown ? (
								<>
									<NavigationMenuTrigger className="bg-tranparent p-0 m-0">{item.label}</NavigationMenuTrigger>
									<NavigationMenuContent className="bg-light dark:bg-foreground border-b-[1px] border-foreground/10 dark:border-offwhite/10 md:right-0 lg:-right-20">
										<ul className="grid w-[400px] gap-2 grid-cols-1">
											{item.dropdown.map((dropdown) => (
												<ListItem
													key={dropdown.title}
													title={dropdown.title}
													href={dropdown.href}
													className="rounded-md hover:bg-background/5 dark:hover:bg-offwhite/5">
													{dropdown.description}
												</ListItem>
											))}
										</ul>
									</NavigationMenuContent>
								</>
							) : (
								<Link key={item.label} to={item.href} className="font-medium">
									{item.label}
								</Link>
							)}
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

const HamburgerMenu = ({ isMenuShown }: { isMenuShown: boolean }) => {
	const { isLoggedIn, logout } = useAuthStore();
	const { userData, user } = useUserStore();
	const navigate = useNavigate();

	const handleLogout = async () => {
		const { success, message } = await logout();
		if (success) {
			navigate("/log-in");
		} else {
			toast.error(message);
		}
	};

	return (
		<div
			className={`fixed inset-0 top-20 bg-background/5 duration-200 overflow-auto lg:hidden dark:bg-offwhite/5 modal ${
				isMenuShown ? "block" : "invisible"
			}`}>
			<div
				className={`bg-white/100 min-h-full shadow-[0px_3px_10px_rgba(0,0,0,0.2)] dark:bg-black/100 dark:border-offwhite/10 dark:border-[1px] max-w-[300px] ml-auto duration-300 ${
					isMenuShown ? "translate-x-0" : "translate-x-[200%]"
				}`}>
				<div className="flex flex-col min-h-[90vh] overflow-hidden items-end text-right mr-6 py-4 w-full">
					{navItems.map((item: NavListProps, index) => {
						const last = index === navItems.length - 1;
						return (
							<div key={item.label} className="w-full">
								{item.dropdown ? (
									<Accordion key={item.label} type="single" collapsible>
										<AccordionItem value={item.label}>
											<AccordionTrigger className="border-b-[1px] border-background/10 dark:border-offwhite/10 font-bold py-3 px-3 min-w-fit rounded-none hover:bg-background/5 dark:hover:bg-offwhite/5">
												{item.label}
											</AccordionTrigger>
											<AccordionContent className="flex flex-col text-balance pb-0 px-3">
												{item.dropdown.map((dropdown) => (
													<Link
														key={dropdown.title}
														to={dropdown.href}
														className="py-2 hover:text-background/70 dark:hover:text-offwhite/70">
														{dropdown.title}
													</Link>
												))}
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								) : (
									<Link
										key={item.label}
										to={item.href}
										className={`inline-block border-b-[1px] border-background/10 dark:border-offwhite/10 w-full font-bold py-3 px-3 hover:bg-background/5 dark:hover:bg-offwhite/5 duration-200 ${
											last && "border-none"
										}`}>
										{item.label}
									</Link>
								)}
							</div>
						);
					})}

					{isLoggedIn && userData ? (
						<div className="flex mt-auto w-full justify-end items-center gap-5 px-4 py-2 border-t-[1px] border-background/10 dark:border-offwhite/10">
							<LogOut onClick={handleLogout} className="mr-auto text-red-500 h-6 w-6 cursor-pointer" />
							<b>{user?.firstName}</b>
							<Link to="/profile">
								<Avatar className="w-12 h-12 bg-light dark:bg-foreground">
									<AvatarImage src="" />
									<AvatarFallback>{`${user?.firstName[0].toUpperCase()} ${user?.lastName[0].toUpperCase()}`}</AvatarFallback>
								</Avatar>
							</Link>
						</div>
					) : (
						<div className="flex flex-col gap-y-3 w-full my-6 px-3">
							<Link
								to="/log-in"
								className="py-2 grid place-content-center rounded-md cursor-pointer border border-regular hover:bg-regular/5">
								Log in
							</Link>
							<Link
								to="/sign-up"
								className="py-2 grid place-content-center rounded-md cursor-pointer text-white bg-regular hover:bg-regular/85">
								Sign up
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

interface HamburgerMenuIconProps {
	isMenuShown: boolean;
	handleMenuShow: () => void;
}

const HamburgerMenuIcon = ({ isMenuShown, handleMenuShow }: HamburgerMenuIconProps) => {
	return (
		<div className="flex flex-col gap-y-1 lg:hidden cursor-pointer relative" onClick={handleMenuShow}>
			<div
				className={`w-5 h-[2px] bg-regular rounded-full self-end duration-300 ${
					isMenuShown ? "rotate-45 duration-300 translate-y-[6px]" : ""
				}`}></div>
			<div className={`w-7 h-[2px] bg-regular rounded-full duration-300 ${isMenuShown ? "hidden" : ""}`}></div>
			<div
				className={`w-5 h-[2px] bg-regular rounded-full self-end duration-300 ${
					isMenuShown ? "-rotate-45 duration-300 " : ""
				}`}></div>
		</div>
	);
};

export default NavBar;
