import { create } from "zustand";
import { Division } from "@/type/division-types";
export type DivisionStore = {
  divisions: Division[];
  currentDivision: Division;
  setCurrentDivision: (currentDivision: Division) => void;
};

export const useDivisionStore = create<DivisionStore>((set) => ({
  divisions: [
    { divisionId: "1", divisionName: "경기서남권사업소" },
    { divisionId: "2", divisionName: "경기북권사업소asdfadsfasfS" },
    { divisionId: "3", divisionName: "경기중부권사업소" },
    { divisionId: "4", divisionName: "경기동권사업소" },
    { divisionId: "5", divisionName: "경기동권사업소" },
  ],
  currentDivision: { divisionId: "1", divisionName: "경기서남권사업소" },
  setCurrentDivision: (currentDivision: Division) => set({ currentDivision }),
}));
