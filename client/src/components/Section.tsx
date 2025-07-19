interface SectionProps {
	className?: string;
	children: React.ReactNode;
	title?: string;
	subtitle?: string;
}

const Section = ({ className, children, subtitle, title }: SectionProps) => {
	return (
		<section className={`relative my-10 px-3 w-full ${className}`}>
			<div className="max-w-[1250px] gap-6 mx-auto flex flex-col text-center items-center justify-center">
				<h1 className="text-xl font-bold font-Montserrat leading-7 md:text-2xl md:leading-9 lg:text-3xl lg:leading-10">
					{title}
				</h1>
				<h2 className="font-semibold text-background/55 dark:text-offwhite/55 md:text-xl">{subtitle}</h2>
				{children}
			</div>
		</section>
	);
};

export default Section;
