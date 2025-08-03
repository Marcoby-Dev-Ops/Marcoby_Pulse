import { create } from "zustand";

const useProductStore = create(() => ({
	product: {},
}));

export default useProductStore;
