import { create } from "zustand";
import { Vendor } from "@/api/vendors";
import { User } from "@/types/user";

export interface GlobalStore {
  user: User | null;
  myVendor: Vendor | null;
  setUser: (user: User) => void;
  setMyVendor: (vendor: Vendor) => void;
}

const useGlobalStore = create<GlobalStore>((set, get) => ({
  myVendor: null,
  user: null,
  setMyVendor: (vendor: Vendor) => set({ myVendor: vendor }),
  setUser: (user: User) => set({ user: user }),
}));

export default useGlobalStore;
