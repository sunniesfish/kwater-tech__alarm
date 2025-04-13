import { create } from "zustand";

export type DockStore = {
  isDeleteMode: boolean;
  setIsDeleteMode: (isDeleteMode: boolean) => void;
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
};

export const useDockStore = create<DockStore>((set) => ({
  isDeleteMode: false,
  setIsDeleteMode: (isDeleteMode: boolean) => {
    set({ isDeleteMode });
    set({ isEditMode: false });
  },
  isEditMode: false,
  setIsEditMode: (isEditMode: boolean) => {
    set({ isEditMode });
    set({ isDeleteMode: false });
  },
}));
