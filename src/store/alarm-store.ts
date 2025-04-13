import { create } from "zustand";
import { Alarm } from "../type/alarm-type";

export type AlarmStore = {
  alarmList: Alarm[];
  addAlarm: (alarm: Alarm) => void;
  setAlarmList: (alarmList: Alarm[]) => void;
  getAlarm: (alarmId: string) => Alarm | undefined;
  removeAlarm: (alarmId: string) => void;
};

export const useAlarmStore = create<AlarmStore>((set, get) => ({
  alarmList: [],
  addAlarm: (alarm: Alarm) =>
    set((state) => ({ alarmList: [...state.alarmList, alarm] })),
  setAlarmList: (alarmList: Alarm[]) => set({ alarmList }),
  getAlarm: (alarmId: string) => {
    const alarm = get().alarmList.find((alarm) => alarm.id === alarmId);
    return alarm;
  },
  removeAlarm: (alarmId: string) =>
    set((state) => ({
      alarmList: state.alarmList.filter((alarm) => alarm.id !== alarmId),
    })),
}));
