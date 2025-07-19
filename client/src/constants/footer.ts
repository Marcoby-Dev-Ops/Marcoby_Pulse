import x from "../assets/svgs/x-logo.svg";
import instagram from "../assets/svgs/instagram.svg";
import facebook from "../assets/svgs/facebook.svg";
import linkedin from "../assets/svgs/linkedin.svg";
import youtube from "../assets/svgs/youtube.svg";

interface FooterProps {
	name: string;
	links: {
		label: string;
		href: string;
	}[];
}

interface FooterIconProps {
	icon: string;
	href: string;
}

export const footer: FooterProps[] = [
	{
		name: "Quick links",
		links: [
			{
				label: "Catalogs",
				href: "/catalogs",
			},
			{
				label: "Features",
				href: "/",
			},
			{
				label: "Pricing",
				href: "/",
			},
			{
				label: "About",
				href: "/",
			},
			{
				label: "Support",
				href: "/",
			},
		],
	},
	{
		name: "Services",
		links: [
			{
				label: "Hardware",
				href: "/",
			},
			{
				label: "Software",
				href: "/",
			},
			{
				label: "Domains",
				href: "/",
			},
			{
				label: "Cloud",
				href: "/",
			},
			{
				label: "Hosting",
				href: "/",
			},
		],
	},
	{
		name: "Quick links",
		links: [
			{
				label: "Catalogs",
				href: "/catalogs",
			},
			{
				label: "Features",
				href: "/",
			},
			{
				label: "Pricing",
				href: "/",
			},
			{
				label: "About",
				href: "/",
			},
			{
				label: "Support",
				href: "/",
			},
		],
	},
	{
		name: "Quick links",
		links: [
			{
				label: "Catalogs",
				href: "/catalogs",
			},
			{
				label: "Features",
				href: "/",
			},
			{
				label: "Pricing",
				href: "/",
			},
			{
				label: "About",
				href: "/",
			},
			{
				label: "Support",
				href: "/",
			},
		],
	},
	{
		name: "Quick links",
		links: [
			{
				label: "Catalogs",
				href: "/catalogs",
			},
			{
				label: "Features",
				href: "/",
			},
			{
				label: "Pricing",
				href: "/",
			},
			{
				label: "About",
				href: "/",
			},
			{
				label: "Support",
				href: "/",
			},
		],
	},
];

export const footerIcons: FooterIconProps[] = [
	{
		icon: x,
		href: "https://x.com/MarcobyOnline",
	},
	{
		icon: instagram,
		href: "https://www.instagram.com/MarcobyOnline/",
	},
	{
		icon: linkedin,
		href: "https://www.linkedin.com/in/MarcobyOnline",
	},
	{
		icon: youtube,
		href: "https://www.youtube.com/@MarcobyOnline",
	},
	{
		icon: facebook,
		href: "https://www.facebook.com/MarcobyOnline",
	},
];
