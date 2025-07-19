export interface ListItemProps {
	title: string;
	href: string;
	description: string;
}

export interface NavListProps {
	label: string;
	href: string;
	dropdown?: ListItemProps[];
}

export const navItems: NavListProps[] = [
	{
		label: "Catalog",
		href: "",
		dropdown: [
			{
				title: "Hosting",
				href: "/",
				description: "Fast and reliable web hosting solutions for websites, apps, and businesses",
			},
			{
				title: "Software",
				href: "/",
				description: "Productivity tools, licensing, and business software for daily operations",
			},
			{
				title: "Hardware",
				href: "/",
				description: "Physical devices like servers, routers, or packaged hardware for enterprise needs",
			},
		],
	},
	{
		label: "Features",
		href: "/",
		dropdown: [
			{
				title: "Overview",
				href: "/",
				description: "A general snapshot of what makes Marcoby Pulse powerful and unique",
			},
			{
				title: "Security",
				href: "/",
				description: "Data encryption, access control, and built-in tools to keep users safe",
			},
			{
				title: "Performance",
				href: "/",
				description: "Fast load times, server uptime, and tools optimized for speed and scale",
			},
		],
	},
	{
		label: "Partners",
		href: "/",
		dropdown: [
			{
				title: "Vendor Info",
				href: "/",
				description: "Details on how to list or supply your products via Marcoby Pulse",
			},
			{
				title: "Reseller Program",
				href: "/",
				description: "Join our network to earn from referrals and product resales",
			},
		],
	},
	{
		label: "Support",
		href: "/",
		dropdown: [
			{
				title: "Knowledge Based",
				href: "/",
				description: "Self-help articles, setup guides, and common troubleshooting",
			},
			{
				title: "Submit a Ticket",
				href: "/",
				description: "Get personalized help from the support team",
			},
		],
	},
	{
		label: "About",
		href: "/",
	},
];
