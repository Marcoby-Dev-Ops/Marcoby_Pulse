import { footer, footerIcons } from "../constants/footer";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-gray-900 w-full pb-10 text-offwhite mt-auto border-t-[1px] border-foreground/10 dark:border-offwhite/10">
			<div className="h-16 border-b-[1px] border-dashed mb-4 border-offwhite/25"></div>
			<div className="max-w-[1250px] mx-auto px-4 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
				{footer.map((item, index) => (
					<div key={index} className="flex flex-col md:items-center">
						<div className="flex flex-col gap-3">
							<h1 className="font-bold">{item.name}</h1>
							{item.links.map((item, index) => (
								<Link to={item.href} key={index}>
									{item.label}
								</Link>
							))}
						</div>
					</div>
				))}
			</div>
			<div className="border-b-[1px] my-6 border-dashed border-offwhite/25"></div>
			<div className="flex flex-col items-center justify-center gap-2">
				<h3 className="font-Montserrat font-bold">Follow Us</h3>
				<div className="flex items-center gap-3">
					{footerIcons.map(({ icon, href }, index) => (
						<a
							href={href}
							key={index}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block w-9 h-9 p-[5px] rounded-md border-[1px] border-solid border-offwhite/5">
							<img src={icon} alt={href} />
						</a>
					))}
				</div>
				<p className="text-offwhite/50 text-sm">© 2025 Marcoby. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
