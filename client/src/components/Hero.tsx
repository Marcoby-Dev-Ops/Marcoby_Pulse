import SearchBar from "../components/SearchBar";
import heroVidBg from "../assets/videos/herobg-pulse.mp4";

const Hero = () => {
	return (
		<div className="relative h-[50vh] top-0">
			<video
				autoPlay
				loop
				muted
				className="absolute w-full h-full top-[50%] left-[50%] object-cover -translate-x-[50%] -translate-y-[50%] z-0">
				<source src={heroVidBg} type="video/mp4" />
			</video>

			<div className="absolute top-0 left-0 w-full h-[101%] bg-[linear-gradient(to_top,rgba(228,240,236,0.8),rgba(228,240,236,0.7),rgba(228,240,236,0.6))] dark:bg-[linear-gradient(to_top,rgba(0,0,0,0.9),rgba(0,0,0,0.8),rgba(0,0,0,0.7))] z-1"></div>
			<div className="relative z-2 h-full px-3 gap-6 max-w-[700px] mx-auto flex flex-col text-center items-center justify-center">
				<h1 className="font-Montserrat text-darkgreen font-semibold text-sm px-2 py-1 md:text-xl bg-offwhite/50 rounded-3xl dark:bg-background/50 md:px-4">
					Your Complete Digital Supply Chain Engine
				</h1>
				<h2 className="font-Montserrat font-bold text-xl leading-7 md:text-2xl md:leading-9 lg:text-3xl lg:leading-10">
					Powering hosting, software, and domain sales with automation, CRM, and real-time fulfillment
				</h2>
				<SearchBar />
			</div>
		</div>
	);
};

export default Hero;
