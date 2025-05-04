import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Alarm } from "../type/alarm-type";

export type AlarmStore = {
  alarmRecord: Record<string, Alarm>;
  refreshKey: object;
  addAlarm: (alarm: Alarm) => void;
  setAlarmRecord: (alarmRecord: Record<string, Alarm>) => void;
  getAlarm: (alarmId: string) => Alarm | undefined;
  removeAlarm: (alarmId: string) => void;
  updateAlarm: (alarmId: string, alarm: Alarm) => void;
};

export const useAlarmStore = create<AlarmStore>()(
  persist(
    (set, get) => ({
      alarmRecord: {},
      refreshKey: {},
      addAlarm: (alarm: Alarm) => {
        set((state) => ({
          alarmRecord: { ...state.alarmRecord, [alarm.id]: alarm },
          refreshKey: {},
        }));
      },
      setAlarmRecord: (alarmRecord: Record<string, Alarm>) =>
        set({
          alarmRecord: { ...get().alarmRecord, ...alarmRecord },
          refreshKey: {},
        }),
      getAlarm: (alarmId: string) => {
        const alarm = get().alarmRecord[alarmId];
        return alarm;
      },
      removeAlarm: (alarmId: string) =>
        set((state) => {
          const newRecord = { ...state.alarmRecord };
          delete newRecord[alarmId];
          return {
            alarmRecord: newRecord,
            refreshKey: {},
          };
        }),
      updateAlarm: (alarmId: string, alarm: Alarm) =>
        set((state) => ({
          alarmRecord: { ...state.alarmRecord, [alarmId]: alarm },
          refreshKey: {},
        })),
    }),
    {
      name: "alarm-store",
    }
  )
);
