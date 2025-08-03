import { create } from "zustand";

interface ResponseStatus {
	success: boolean;
	message: string;
}

interface AdminDetails {
	email: string;
	password: string;
}

interface AdminAuthStoreProps {
	admin: null | string;
	isLoading: boolean;
	token: string | null;
	setToken: (status: string | null) => void;
	login: (admin: AdminDetails) => Promise<ResponseStatus>;
}

const api = import.meta.env.VITE_ADMIN_API_URL;

const useAdminAuthStore = create<AdminAuthStoreProps>((set) => ({
	admin: null,
	isLoading: false,
	token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
	setToken: (status) => set({ token: status }),
	login: async (admin) => {
		if (!admin.email || !admin.password) {
			return {
				success: false,
				message: "Please fill all inputs",
			};
		}

		set({ isLoading: true });
		try {
			const res = await fetch(`${api}/admin/sign-in`, {
				method: "POST",
				body: JSON.stringify(admin),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await res.json();

			if (data.success && res.ok) {
				localStorage.setItem("token", data.token);
				set({ isLoading: false, token: data.token, admin: admin.email });
				return { success: true, message: data.message };
			} else {
				set({ isLoading: false });
				return { success: false, message: data.message };
			}
		} catch (error: any) {
			set({ isLoading: false });
			return { success: false, message: error.message };
		}
	},
}));

export default useAdminAuthStore;
