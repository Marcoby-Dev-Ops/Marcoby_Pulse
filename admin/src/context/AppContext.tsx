import React, { useContext } from "react";

interface AppContextProps {
	isSideBarCollapsed: boolean;
	setIsSideBarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = React.createContext<AppContextProps | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [isSideBarCollapsed, setIsSideBarCollapsed] = React.useState<boolean>(false);

	const value = {
		isSideBarCollapsed,
		setIsSideBarCollapsed,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextProps => {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error("useAppContext must be used within a AppProvider");
	}

	return context;
};

export default AppProvider;
