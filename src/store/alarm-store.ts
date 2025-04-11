import { create } from "zustand";

interface Alarm {
  id: string;
  time: string;
  title: string;
  isActive: boolean;
  days: number[]; // 0: 일요일, 1: 월요일, ..., 6: 토요일
}

interface AlarmState {
  alarms: Alarm[];
  addAlarm: (alarm: Omit<Alarm, "id">) => void;
  removeAlarm: (id: string) => void;
  toggleAlarm: (id: string) => void;
  updateAlarm: (id: string, alarm: Partial<Omit<Alarm, "id">>) => void;
}

export const useAlarmStore = create<AlarmState>((set) => ({
  alarms: [],
  addAlarm: (alarm) =>
    set((state) => ({
      alarms: [...state.alarms, { ...alarm, id: crypto.randomUUID() }],
    })),
  removeAlarm: (id) =>
    set((state) => ({
      alarms: state.alarms.filter((alarm) => alarm.id !== id),
    })),
  toggleAlarm: (id) =>
    set((state) => ({
      alarms: state.alarms.map((alarm) =>
        alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
      ),
    })),
  updateAlarm: (id, updatedAlarm) =>
    set((state) => ({
      alarms: state.alarms.map((alarm) =>
        alarm.id === id ? { ...alarm, ...updatedAlarm } : alarm
      ),
    })),
}));
