import { Division } from "@/type/division-types";

const API_URL = import.meta.env.VITE_API_URL;

export const getDivisionList = async () => {
  return [
    { divisionId: "1", divisionName: "경기서남권사업소" },
    { divisionId: "2", divisionName: "경기북권사업소asdfadsfasfS" },
    { divisionId: "3", divisionName: "경기중부권사업소" },
    { divisionId: "4", divisionName: "경기동권사업소" },
    { divisionId: "5", divisionName: "경기동권사업소" },
  ];
};

export const addDivision = async (division: Division) => {};

export const updateDivison = async (division: Division) => {};

export const deleteDivision = async (divisionId: string) => {};
