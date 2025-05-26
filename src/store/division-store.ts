import { create } from "zustand";
import { Division } from "@/type/division-types";
import { persist } from "zustand/middleware";
import { getDivisionList } from "@/lib/api";

export type DivisionStore = {
  divisions: Division[];
  currentDivision: Division | undefined;
  initialize: () => void;
  setCurrentDivision: (currentDivision: Division) => void;
};

export const useDivisionStore = create<DivisionStore>()(
  persist(
    (set) => ({
      divisions: [],
      currentDivision: undefined,
      setCurrentDivision: (currentDivision: Division) =>
        set({ currentDivision }),
      initialize: async () => {
        const divisionsData: Division[] = await getDivisionList();
        set({
          divisions: divisionsData,
        });
      },
    }),
    {
      name: "division",
    }
  )
);
