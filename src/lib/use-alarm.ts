import { useCallback, useEffect } from "react";
import { Alarm, AlarmMessageType } from "../type/alarm-type";
import { useAlarmStore } from "@/store/alarm-store";
import { useAlarmWorker } from "./use-alarm-worker";
import { useShallow } from "zustand/react/shallow";

export const useAlarm = () => {
  const { sendMessage } = useAlarmWorker();
  const {
    addAlarm,
    removeAlarm,
    alarmRecord,
    updateAlarm: updateAlarmStore,
    refreshKey,
  } = useAlarmStore(
    useShallow((state) => ({
      addAlarm: state.addAlarm,
      removeAlarm: state.removeAlarm,
      alarmRecord: state.alarmRecord,
      updateAlarm: state.updateAlarm,
      refreshKey: state.refreshKey,
    }))
  );

  useEffect(() => {
    sendMessage(AlarmMessageType.SET_ALARM, { alarmRecord });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const createAlarm = useCallback(
    (alarm: Alarm) => {
      addAlarm(alarm);
    },
    [addAlarm]
  );
  const updateAlarm = useCallback(
    (id: string, alarm: Alarm) => {
      updateAlarmStore(id, alarm);
    },
    [updateAlarmStore]
  );

  const deleteAlarm = useCallback(
    (id: string) => {
      removeAlarm(id);
    },
    [removeAlarm]
  );

  return { alarmRecord, createAlarm, deleteAlarm, updateAlarm };
};
