import { useCallback, useEffect, useRef } from "react";
import { Alarm, AlarmMessageType } from "../type/alarm-type";
import { AlarmMessage } from "../type/alarm-type";
import { useAlarmStore } from "@/store/alarm-store";
export const useAlarmWorker = () => {
  const workerRef = useRef<Worker | null>(null);
  const initializedRef = useRef<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlerRef = useRef<Map<AlarmMessageType, (payload: any) => void>>(
    new Map()
  );

  useEffect(() => {
    if (!initializedRef.current) {
      try {
        workerRef.current = new Worker(
          new URL("../workers/alarm-worker.ts", import.meta.url),
          { type: "module" }
        );
        workerRef.current.onmessage = (event: MessageEvent<AlarmMessage>) => {
          const message = event.data;
          if (message.type && handlerRef.current.has(message.type)) {
            const handler = handlerRef.current.get(message.type);
            if (handler) handler(message.payload);
          }
        };
      } catch (error) {
        console.error(error);
      }
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        handlerRef.current.clear();
      }
    };
  }, []);

  const registerHandler = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (type: AlarmMessageType, handler: (payload: any) => void) => {
      handlerRef.current.set(type, handler);
    },
    []
  );

  const unregisterHandler = useCallback((type: AlarmMessageType) => {
    handlerRef.current.delete(type);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendMessage = useCallback((type: AlarmMessageType, payload: any) => {
    console.log("sendMessage", type, payload);
    if (!workerRef.current) {
      throw new Error("Worker is not initialized");
    }
    const message: AlarmMessage = { type, payload };
    workerRef.current.postMessage(message);
  }, []);

  return { registerHandler, unregisterHandler, sendMessage };
};

export const useAlarm = () => {
  const { sendMessage } = useAlarmWorker();
  const { alarmList, addAlarm, removeAlarm } = useAlarmStore();

  useEffect(() => {
    sendMessage(AlarmMessageType.SET_ALARM, { alarmList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alarmList]);

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
