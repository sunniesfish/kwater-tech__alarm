import { create } from "zustand";

export type ConnectionStore = {
  clientId: string;
  setClientId: (clientId: string) => void;
};

export const useConnectionStore = create<ConnectionStore>((set) => ({
  clientId: "",
  setClientId: (clientId: string) => set({ clientId }),
}));
