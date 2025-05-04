import { Alarm } from "@/type/alarm-type";
import { create } from "zustand";

type AlarmInfoModalStore = {
  isOpen: boolean;
  alarm: Alarm | null;
  setIsOpen: (isOpen: boolean) => void;
  setAlarm: (alarm: Alarm) => void;
};

export const useAlarmInfoModalStore = create<AlarmInfoModalStore>((set) => ({
  isOpen: false,
  alarm: null,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  setAlarm: (alarm: Alarm) => set({ alarm }),
}));
