import { create } from "zustand";
import useUserStore from "./userStore";

interface User {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	companyName?: string;
	password: string;
	confirmPassword: string;
}

interface UserLoginProps {
	email: string;
	password: string;
}

interface UserResetPasswordProps {
	email: string;
	otp: string;
	newPassword: string;
}

export interface ResponseStatus {
	success: boolean;
	message: string;
}

interface AuthState {
	isLoggedIn: boolean;
	isLoading: boolean;
	isMessageError: boolean;
	createUser: (newUser: User) => Promise<ResponseStatus>;
	login: (user: UserLoginProps) => Promise<ResponseStatus>;
	logout: () => Promise<ResponseStatus>;
	getAuthState: () => Promise<ResponseStatus>;
	sendVerificationOtp: () => Promise<ResponseStatus>;
	verifyOtp: (otp: { otp: string }) => Promise<ResponseStatus>;
	sendResetPasswordOtp: (email: { email: string }) => Promise<ResponseStatus>;
	verifyResetPasswordDetails: (userResetPasswordDetails: UserResetPasswordProps) => Promise<ResponseStatus>;
}

export const api = (import.meta as any).env.VITE_API_URL;

const useAuthStore = create<AuthState>((set) => ({
	isLoggedIn: false,
	isLoading: false,
	isMessageError: false,
	createUser: async (newUser) => {
		if (newUser.confirmPassword !== newUser.password) {
			return {
				success: false,
				message: "Password does not match! Please recheck",
			};
		}
		try {
			set({ isLoading: true });
			const response = await fetch(`${api}/auth/sign-up`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUser),
				credentials: "include",
			});

			const data = await response.json();
			if (response.ok && data.success) {
				set({ isLoggedIn: false, isLoading: false, isMessageError: false });
				return { success: true, message: data.message };
			} else {
				set({ isLoggedIn: false, isLoading: false, isMessageError: true });
				return { success: false, message: data.message };
			}
		} catch (error: any) {
			set({ isLoggedIn: false, isLoading: false, isMessageError: true });
			return {
				success: false,
				message: error.message,
			};
		} finally {
			set({ isLoading: false });
		}
	},

	login: async (user) => {
		const { getUserData, setUserData } = useUserStore.getState();
		try {
			set({ isLoading: true });
			const response = await fetch(`${api}/auth/sign-in`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
				credentials: "include",
			});

			const data = await response.json();
			if (response.ok && data.success) {
				const userResult = await getUserData();

				if (userResult.success) {
					setUserData(true);
					set({ isLoggedIn: true, isMessageError: false, isLoading: false });
					return { success: true, message: data.message };
				} else {
					set({ isLoggedIn: false, isMessageError: true, isLoading: false });
					return { success: false, message: data.message };
				}
			} else {
				setUserData(false);
				set({ isLoggedIn: false, isLoading: false, isMessageError: true });
				return { success: false, message: data.message };
			}
		} catch (error: any) {
			setUserData(false);
			set({ isLoggedIn: false, isLoading: false, isMessageError: true });
			return {
				success: false,
				message: error.message,
			};
		} finally {
			set({ isLoading: false });
		}
	},

	logout: async () => {
		const { setUserData } = useUserStore.getState();
		try {
			const response = await fetch(`${api}/auth/sign-out`, {
				method: "POST",
				credentials: "include",
			});

			const data = await response.json();

			if (response.ok && data.success) {
				set({ isLoggedIn: false });
				setUserData(false);
				return {
					success: true,
					message: data.message,
				};
			} else {
				return {
					success: false,
					message: data.message,
				};
			}
		} catch (error: any) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	getAuthState: async () => {
		try {
			const response = await fetch(`${api}/auth/is-auth`, {
				method: "GET",
				credentials: "include",
			});

			const data = await response.json();
			if (response.ok && data.success) {
				set({ isLoggedIn: true, isLoading: false, isMessageError: false });
				const { getUserData } = useUserStore.getState();
				await getUserData();
				return { success: true, message: data.message };
			} else {
				set({ isLoggedIn: false, isLoading: false, isMessageError: true });
				return { success: false, message: data.message };
			}
		} catch (error: any) {
			set({ isLoggedIn: false, isLoading: false, isMessageError: true });
			return {
				success: false,
				message: error.message,
			};
		} finally {
			set({ isLoading: false });
		}
	},

	sendVerificationOtp: async () => {
		try {
			set({ isLoading: true });
			const response = await fetch(`${api}/auth/send-otp`, {
				method: "POST",
				credentials: "include",
			});

			const data = await response.json();

			if (response.ok && data.success) {
				set({ isLoading: false, isMessageError: false });
				return { success: true, message: data.message };
			} else {
				set({ isLoading: false, isMessageError: true });
				return { success: false, message: data.message };
			}
		} catch (error: any) {
			set({ isLoading: false, isMessageError: true });
			return { success: false, message: error.message };
		} finally {
			set({ isLoading: false });
		}
	},

	verifyOtp: async (otp) => {
		try {
			set({ isLoading: true });
			const response = await fetch(`${api}/auth/verify-otp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(otp),
				credentials: "include",
			});

			const data = await response.json();
			if (response.ok && data.success) {
				set({ isLoading: false, isMessageError: false });
				return { success: true, message: data.message };
			} else {
				set({ isLoading: false, isMessageError: true });
				return {
					success: false,
					message: data.message,
				};
			}
		} catch (error: any) {
			set({ isLoading: false, isMessageError: true });
			return {
				success: false,
				message: error.message,
			};
		} finally {
			set({ isLoading: false });
		}
	},

	sendResetPasswordOtp: async (email) => {
		try {
			set({ isLoading: true });
			const response = await fetch(`${api}/auth/send-reset-otp`, {
				method: "POST",
				body: JSON.stringify(email),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();

			if (response.ok && data.success) {
				set({ isLoading: false, isMessageError: false });
				return { success: true, message: data.message };
			} else {
				set({ isLoading: false, isMessageError: true });
				return { success: false, message: data.message };
			}
		} catch (error: any) {
			set({ isLoading: false, isMessageError: true });
			return { success: false, message: error.message };
		} finally {
			set({ isLoading: false });
		}
	},

	verifyResetPasswordDetails: async (userResetPasswordDetails) => {
		try {
			set({ isLoading: true });

			const response = await fetch(`${api}/auth/reset-password`, {
				method: "POST",
				body: JSON.stringify(userResetPasswordDetails),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();

			if (response.ok && data.success) {
				set({ isLoading: false, isMessageError: false });
				return { success: true, message: data.message };
			} else {
				set({ isLoading: false, isMessageError: true });
				return { success: false, message: data.message };
			}
		} catch (error: any) {
			set({ isLoading: false, isMessageError: true });
			return { success: false, message: error.message };
		} finally {
			set({ isLoading: false });
		}
	},
}));

export default useAuthStore;
