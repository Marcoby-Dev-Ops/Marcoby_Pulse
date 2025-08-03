import React from "react";

const useIsMedium = () => {
	const [isMedium, setIsMedium] = React.useState<boolean>(false);
	const mediumScreen = 664;

	React.useEffect(() => {
		const mq = window.matchMedia(`(min-width: ${mediumScreen}px)`);
		setIsMedium(mq.matches);

		const handler = (e: MediaQueryListEvent) => setIsMedium(e.matches);
		mq.addEventListener("change", handler);

		return () => mq.removeEventListener("change", handler);
	}, []);

	return isMedium;
};

export default useIsMedium;
