import Hero from "../components/Hero";
import {
	Globe,
	Users,
	Zap,
	BriefcaseBusiness,
	Cloud,
	Cog,
	CreditCard,
	FileText,
	ShoppingCart,
	type LucideProps,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import Section from "../components/Section";
import NinjaOne from "../assets/svgs/ninjaone.svg";
import NordPass from "../assets/svgs/nordpass.svg";
import PayPal from "../assets/svgs/paypal-3.svg";
import SentinelOne from "../assets/svgs/sentinelone-logo.svg";
import Stripe from "../assets/svgs/stripe-4.svg";
import Atlassian from "../assets/svgs/atlassian.svg";
import Fortinet from "../assets/svgs/fortinet-logo.svg";
import Hubspot from "../assets/svgs/hubspot.svg";
import intuitReal from "../assets/svgs/intuitreal.svg";
import Lenovo from "../assets/svgs/lenovo-1.svg";
import Microsoft from "../assets/svgs/microsoft-6.svg";
import { Link } from "react-router-dom";
import howitworksImg from "../assets/images/howitworks.jpg";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";

const Home = () => {
	return (
		<div>
			<Hero />
			<Pulse />
			<TrustedBy />
			<Capabilities />
			<HowItWorks />
			<Reviews />
			<CTA />
		</div>
	);
};

interface PulseProps {
	title: string;
	textContent: string;
	icon: LucideProps;
}

// PULSE SECTION

const pulseItems: PulseProps[] = [
	{
		title: "Vendor Integration",
		textContent: "Direct API connections with major vendors for real-time inventory and automated provisioning.",
		icon: <Globe className="h-12 w-12 text-regular mx-auto mb-4" />,
	},
	{
		title: "Automation Engine",
		textContent: "End-to-end automation from quote generation to service delivery and ongoing management.",
		icon: <Zap className="h-12 w-12 text-amber-600 mx-auto mb-4" />,
	},
	{
		title: "CRM & Engagement",
		textContent: "Built-in customer relationship management with behavioral tracking and engagement tools.",
		icon: <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
	},
];

const Pulse = () => {
	return (
		<Section
			title="What is Marcoby Pulse?"
			subtitle="Pulse is your comprehensive commerce and automation hub, seamlessly integrating with industry leaders like
						Ingram Micro, Namecheap, and Pax8 to power your digital supply chain.">
			<div className="grid md:grid-cols-3 gap-8">
				{pulseItems.map(({ title, textContent, icon }, index) => (
					<Card
						key={index}
						className="text-center rounded-md border-[1px] border-solid border-foreground/10 dark:border-offwhite/10">
						<CardHeader>
							<>{icon}</>
							<CardTitle>{title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-background/80 dark:text-offwhite/80">{textContent}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</Section>
	);
};

// PARTNERS SECTION
interface PartnersProps {
	name: string;
	image: string;
}

const partners: PartnersProps[] = [
	{
		name: "Ninja One",
		image: NinjaOne,
	},
	{
		name: "Nord Pass",
		image: NordPass,
	},
	{
		name: "PayPal",
		image: PayPal,
	},
	{
		name: "Sentinel One",
		image: SentinelOne,
	},
	{
		name: "Stripe",
		image: Stripe,
	},
	{
		name: "Atlassian",
		image: Atlassian,
	},
	{
		name: "Fortinet",
		image: Fortinet,
	},
	{
		name: "Hubspot",
		image: Hubspot,
	},
	{
		name: "Intuit Real",
		image: intuitReal,
	},
	{
		name: "Lenovo",
		image: Lenovo,
	},
	{
		name: "Microsoft",
		image: Microsoft,
	},
];

const TrustedBy = () => {
	return (
		<Section
			className="py-10 px-0 bg-linear-to-b from-offwhite via-light to-offwhite dark:from-foreground/10 dark:via-foreground/80 dark:to-foreground/10"
			subtitle="We partner with top companies around the world">
			<div className="grid grid-cols-4 place-items-center gap-4 w-full md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
				{partners.map(({ name, image }) => (
					<div key={name} className="flex justify-center items-center w-auto h-auto">
						<img src={image} alt={name} width={100} height={90} />
					</div>
				))}
			</div>
		</Section>
	);
};

interface CapabilitiesProps {
	title: string;
	subtitle: string;
	desc: string;
	icon: LucideProps;
}

const capabilities: CapabilitiesProps[] = [
	{
		title: "Product Procurement",
		subtitle: "Simplify sourcing and fulfillment.",
		desc: "Real-time inventory sync and automated procurement from major vendors with bundled offerings.",
		icon: <ShoppingCart className="text-primary size-10" />,
	},
	{
		title: "Automation",
		subtitle: "Workflows that do the work for you.",
		desc: "Trigger automatic provisioning, billing, and customer notifications based on purchases or subscription events.",
		icon: <Cog className="text-red-400 size-10" />,
	},
	{
		title: "CRM & Engagement",
		subtitle: "Centralize your customer relationships.",
		desc: "Track renewals, upgrades, and customer behavior with integrated communication history.",
		icon: <BriefcaseBusiness className="text-blue-400 size-10" />,
	},
	{
		title: "Billing & Support",
		subtitle: "Scale with recurring revenue.",
		desc: "Usage-based billing, consolidated invoicing, and built-in support tiering system.",
		icon: <CreditCard className="text-yellow-400 size-10" />,
	},
	{
		title: "Cloud Management",
		subtitle: "Centralized SaaS & Server Management",
		desc: "Unified panel for M365, Google Workspace, VPS management with overage alerts.",
		icon: <Cloud className="text-cyan-400 size-10" />,
	},
	{
		title: "Sales & Quoting",
		subtitle: "Smart, Automated Sales Proposals",
		desc: "Customizable quote templates with smart upselling and automated proposal generation.",
		icon: <FileText className="text-emerald-400 size-10" />,
	},
];

const Capabilities = () => {
	return (
		<Section title="Core Capabilities" subtitle="What we can do for you" className="py-10">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{capabilities.map(({ title, subtitle, desc, icon }, index) => (
					<Card
						key={index}
						className="gap-4 rounded-md text-left shadow-none bg-light dark:bg-foreground border-[1px] border-solid border-foreground/10 dark:border-offwhite/10">
						<CardHeader className="gap-4">
							<>{icon}</>
							<CardTitle className="font-Montserrat font-bold">{title}</CardTitle>
							<h3 className="italic font-medium font-Poppins">{subtitle}</h3>
						</CardHeader>
						<CardContent className="flex flex-col gap-4 mt-auto">
							<p className="text-background/80 dark:text-offwhite/80">{desc}</p>
							<Link
								to="/features"
								className="inline-flex justify-center bg-transparent items-center border-[1px] border-foreground/20 dark:border-offwhite/20 rounded-md w-full px-4 py-2 font-medium font-Poppins hover:bg-background/5 dark:hover:bg-offwhite/5 duration-300">
								Learn more <span className="ml-3 text-regular">➤</span>
							</Link>
						</CardContent>
					</Card>
				))}
			</div>
		</Section>
	);
};

interface HowItWorksProps {
	step: string;
	text: string;
}

const howitworks: HowItWorksProps[] = [
	{
		step: "Choose Products",
		text: "Select from domains, hosting, software, and cloud solutions.",
	},
	{
		step: "Automate Fulfillment",
		text: "Provision services instantly via integrated distributor APIs.",
	},
	{
		step: "Engage Customers",
		text: "Manage communication, support, and upsells in one place.",
	},
	{
		step: "Track Everything",
		text: "Monitor sales, subscriptions, usage, and customer activity.",
	},
];

const HowItWorks = () => {
	return (
		<Section
			className="pt-10 mb-0 bg-linear-to-b from-offwhite via-background/5 to-offwhite dark:from-foreground/10 dark:via-foreground/80 dark:to-foreground/10 min-w-full"
			title="How Pulse Works"
			subtitle="End-to-end automation in four simple steps">
			<div className="grid grid-cols-1 place-items-center w-full lg:grid-cols-2">
				<div className="flex flex-col items-center justify-center gap-3 my-12 px-4 w-full md:gap-6 md:w-auto row-start-2 lg:col-start-2 lg:row-start-1">
					{howitworks.map(({ step, text }, index) => (
						<div key={index} className="relative flex flex-col w-full text-offwhite p-4">
							<div className="absolute skew-x-12 inset-x-0 -inset-y-4 bg-gradient-to-br from-regular via-darkgreen/95 to-darkgreen/90 z-1 shadow-xl"></div>
							<div className="relative z-2">
								<h3 className="font-bold font-Montserrat">{step}</h3>
								<p className="text-xs text-offwhite/70">{text}</p>
							</div>
						</div>
					))}
				</div>
				<div className="relative h-auto w-auto row-start-1 lg:col-start-1">
					<img src={howitworksImg} alt="how-it-works" width={400} height={300} />
				</div>
			</div>
		</Section>
	);
};

interface ReviewProps {
	id: number;
	name: string;
	avatar: string;
	rating: number;
	date: string;
	title: string;
	role?: string;
	content: string;
}
const reviews: ReviewProps[] = [
	{
		id: 1,
		name: "Sarah Johnson",
		avatar: "/placeholder.svg?height=40&width=40",
		rating: 5,
		date: "2024-01-15",
		title: "Excellent Performance",
		content:
			"Been using this VPS for 6 months now. The performance is outstanding and support is very responsive. Highly recommended for production workloads.",
	},
	{
		id: 2,
		name: "Mike Chen",
		avatar: "/placeholder.svg?height=40&width=40",
		rating: 5,
		date: "2024-01-10",
		title: "Great Value for Money",
		content:
			"Switched from another provider and the difference is night and day. Better performance at a lower price point. Setup was quick and easy.",
	},
	{
		id: 3,
		name: "Alex Rodriguez",
		avatar: "/placeholder.svg?height=40&width=40",
		rating: 4,
		date: "2024-01-05",
		title: "Solid Hosting Solution",
		content:
			"Very reliable hosting with good uptime. The control panel is intuitive and the server responds quickly. Minor issues with initial setup but support helped resolve them.",
	},
];

const Reviews = () => {
	return (
		<Section
			title="Customer Success Stories"
			subtitle="See how businesses are transforming their operations with Pulse">
			<Carousel
				opts={{
					align: "start",
				}}
				orientation="vertical"
				className="relative w-full max-w-md my-10">
				<div className="z-2 absolute inset-x-0 bottom-0 h-7 bg-linear-to-t from-offwhite via-offwhite/60 to-offwhite/15 dark:from-background dark:via-background/60 dark:to-foreground/10"></div>
				<CarouselContent className="-mt-1 h-[220px] md:h-[250px]">
					{reviews.map(({ name, avatar, content, role }, index) => (
						<CarouselItem key={index} className="pt-1 md:basis-1/2">
							<div className="p-1">
								<Card className="p-4 gap-4 rounded-md text-left bg-background/5 dark:bg-foreground border-[1px] border-solid border-foreground/10 dark:border-offwhite/10">
									<CardContent className="p-0">
										<div className="flex items-center mb-4">
											<Avatar className="h-12 w-12 mr-4">
												<AvatarImage src={avatar} />
												<AvatarFallback>{name}</AvatarFallback>
											</Avatar>
											<div>
												<h1 className="font-Montserrat font-bold">{name}</h1>
												<p className="font-medium font-Poppins text-regular/60">{role}</p>
											</div>
										</div>
										<blockquote className=" text-background/70 dark:text-offwhite/70 italic">{content}</blockquote>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="text-amber-400 bg-transparent border-[1px] border-solid border-foreground/20 dark:border-offwhite/20" />
				<CarouselNext className="text-amber-400 bg-transparent border-[1px] border-solid border-foreground/20 dark:border-offwhite/20" />
			</Carousel>
		</Section>
	);
};

// C T A SECTION

const CTA = () => {
	return (
		<Section className="mb-0 mt-0 py-12 px-4 min-w-full bg-gradient-to-r from-darkgreen/95 to-darkgreen">
			<div className="mx-auto text-center flex flex-col gap-4 max-w-4xl">
				<h2 className="text-3xl md:text-4xl font-bold font-Montserrat text-white">
					Ready to streamline your digital supply chain?
				</h2>
				<p className="font-Poppins text-green-100 md:text-xl">
					Join hundreds of businesses already using Pulse to automate their digital commerce operations.
				</p>
				<div className="flex flex-col md:flex-row gap-4 justify-center">
					<Button size="lg" className="bg-offwhite text-background hover:bg-offwhite/90 px-8 py-3">
						Start Free Trial
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="border-0 text-offwhite bg-background hover:bg-background/90 px-8 py-3">
						Request a Demo
					</Button>
				</div>
			</div>
		</Section>
	);
};

export default Home;
