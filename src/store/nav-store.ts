import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NavState {
  current: View;
  setView: (view: View) => void;
}

export enum View {
  Alarm = "alarm",
  Music = "music",
}

export const useNavStore = create<NavState>()(
  persist(
    (set) => ({
      current: View.Alarm,
      setView: (view) => set({ current: view }),
    }),
    {
      name: "nav",
    }
  )
);
