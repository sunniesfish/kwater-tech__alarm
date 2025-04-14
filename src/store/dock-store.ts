import { create } from "zustand";

export type DockStore = {
  isDeleteMode: boolean;
  setIsDeleteMode: (isDeleteMode: boolean) => void;
  isAddMode: boolean;
  setIsAddMode: (isAddMode: boolean) => void;
};

export const useAlarmDockStore = create<DockStore>((set) => ({
  isDeleteMode: false,
  setIsDeleteMode: (isDeleteMode: boolean) => {
    set({ isDeleteMode });
    set({ isAddMode: false });
  },
  isAddMode: false,
  setIsAddMode: (isAddMode: boolean) => {
    set({ isAddMode });
    set({ isDeleteMode: false });
  },
}));

export const useMusicDockStore = create<DockStore>((set) => ({
  isDeleteMode: false,
  setIsDeleteMode: (isDeleteMode: boolean) => {
    set({ isDeleteMode });
  },
  isAddMode: false,
  setIsAddMode: (isAddMode: boolean) => {
    set({ isAddMode });
    set({ isDeleteMode: false });
  },
}));
