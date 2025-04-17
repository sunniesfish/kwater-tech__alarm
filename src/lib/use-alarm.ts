import { useCallback, useEffect } from "react";
import { Alarm, AlarmMessageType } from "../type/alarm-type";
import { useAlarmStore } from "@/store/alarm-store";
import { useAlarmWorker } from "./use-alarm-worker";
import { useShallow } from "zustand/react/shallow";

export const useAlarm = () => {
  const { sendMessage } = useAlarmWorker();
  const { addAlarm, removeAlarm, alarmList, refreshKey } = useAlarmStore(
    useShallow((state) => ({
      addAlarm: state.addAlarm,
      removeAlarm: state.removeAlarm,
      alarmList: state.alarmList,
      refreshKey: state.refreshKey,
    }))
  );

  useEffect(() => {
    sendMessage(AlarmMessageType.SET_ALARM, { alarmList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const createAlarm = useCallback(
    (alarm: Alarm) => {
      addAlarm(alarm);
    },
    [addAlarm]
  );

  const deleteAlarm = useCallback(
    (id: string) => {
      removeAlarm(id);
    },
    [removeAlarm]
  );

  return { alarmList, createAlarm, deleteAlarm };
};
