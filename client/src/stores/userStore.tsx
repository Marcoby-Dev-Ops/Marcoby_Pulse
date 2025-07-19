import { create } from "zustand";
import { api, type ResponseStatus } from "./authStore";

interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	companyName: string;
	isActive: string;
	isVerified: boolean;
}

interface UserStoreProps {
	user: User | null;
	userData: boolean;
	setUserData: (status: boolean) => void;
	isLoading: boolean;
	setIsLoading: (status: boolean) => void;
	getUserData: () => Promise<ResponseStatus>;
}

const useUserStore = create<UserStoreProps>((set) => ({
	user: {} as User,
	userData: false,
	setUserData: (status) => set({ userData: status }),
	isLoading: false,
	setIsLoading: (status) => set({ isLoading: status }),
	getUserData: async () => {
		try {
			set({ isLoading: true });
			const response = await fetch(`${api}/user/data`, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();

			if (response.ok) {
				set({ user: data.data.user, userData: true, isLoading: false });
				return { success: true, message: data.message };
			} else {
				set({ isLoading: false });
				return { success: false, message: "Network Error! Try again" };
			}
		} catch (error: any) {
			set({ isLoading: false, userData: false });
			return {
				success: false,
				message: error.message,
			};
		}
	},
}));

export default useUserStore;
