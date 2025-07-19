import { useEffect, useState } from "react";

export const useNetworkStatus = (): boolean => {
	const [isOnline, setIsOnline] = useState(true);

	useEffect(() => {
		const updateOnlineStatus = () => setIsOnline(navigator.onLine);

		window.addEventListener("online", updateOnlineStatus);
		window.addEventListener("offline", updateOnlineStatus);

		updateOnlineStatus();

		return () => {
			window.removeEventListener("online", updateOnlineStatus);
			window.removeEventListener("offline", updateOnlineStatus);
		};
	}, []);
	return isOnline;
};
