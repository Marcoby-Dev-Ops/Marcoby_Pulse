import logo from "../assets/images/logo.png";
import { Award, Globe, TrendingUp, Zap, type LucideProps } from "lucide-react";

interface DisplayFeatureProps {
	title: string;
	text: string;
	icon: LucideProps;
}

const displayFeature: DisplayFeatureProps[] = [
	{
		title: "Increase Revenue by 40%",
		text: "Smart upselling and automated workflows drive more sales",
		icon: <TrendingUp className="h-5 w-5" />,
	},
	{
		title: "Cut Processing Time in Half",
		text: "Automated order processing and instant service provisioning",
		icon: <Zap className="h-5 w-5" />,
	},
	{
		title: "Major Vendor Integrations",
		text: "Connect with Ingram Micro, Namecheap, Pax8, and more",
		icon: <Globe className="h-5 w-5" />,
	},
	{
		title: "Enterprise-Grade Platform",
		text: "Trusted by MSPs and digital service providers worldwide",
		icon: <Award className="h-5 w-5" />,
	},
];

const FeatureAuthDisplay = () => {
	return (
		<div className="relative flex items-center py-20 px-4 bg-light text-foreground min-h-full border-r-[1px] border-foreground/10 dark:border-offwhite/10 lg:w-1/2 dark:text-offwhite dark:bg-foreground lg:px-20">
			<div className="flex flex-col justify-center">
				<div className="text-center mb-6 md:text-left">
					<div className="flex flex-col items-center space-x-3 mb-6 md:flex-row">
						<img src={logo} alt="logo" className="w-20 h-20" />
						<span className="text-2xl font-bold font-Montserrat">Marcoby Pulse</span>
					</div>
					<h1 className="text-xl font-bold mb-2 font-Poppins leading-tight">
						Transform Your Digital Commerce Operations
					</h1>
					<p className="text-base mb-6 leading-relaxed">
						Join hundreds of businesses already using Pulse to automate their digital supply chain and boost revenue.
					</p>
				</div>

				<div className="space-y-6">
					{displayFeature.map(({ title, text, icon }, index) => (
						<div key={index} className="flex items-start space-x-4">
							<div className="w-10 h-10 bg-background/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 dark:bg-offwhite/20">
								<>{icon}</>
							</div>
							<div>
								<h3 className="font-semibold text-base mb-1">{title}</h3>
								<p className="text-background/65 dark:text-offwhite/65">{text}</p>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 pt-8 text-background/55 border-t-[1px] border-foreground/10 dark:border-offwhite/10 dark:text-offwhite/55">
					<div className="grid grid-cols-3 gap-6 text-center">
						<div>
							<div className="text-2xl font-bold">500+</div>
							<div className="">Active Businesses</div>
						</div>
						<div>
							<div className="text-2xl font-bold">99.9%</div>
							<div className="">Uptime SLA</div>
						</div>
						<div>
							<div className="text-2xl font-bold">24/7</div>
							<div className="">Expert Support</div>
						</div>
					</div>
				</div>
			</div>
			{/* Decorative elements */}
			<div className="absolute top-20 right-20 w-32 h-32 bg-background/10 rounded-full blur-xl dark:bg-offwhite/10"></div>
			<div className="absolute bottom-20 right-32 w-24 h-24 bg-background/10 rounded-full blur-xl dark:bg-offwhite/10"></div>
			<div className="absolute top-1/2 right-10 w-16 h-16 bg-background/10 rounded-full blur-xl dark:bg-offwhite/10"></div>
		</div>
	);
};

export default FeatureAuthDisplay;
