import { useCallback, useEffect, useRef } from "react";
import { AlarmMessage, AlarmMessageType } from "../type/alarm-type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handlerMap = new Map<AlarmMessageType, (payload: any) => void>();

export const useAlarmWorker = () => {
  const workerRef = useRef<Worker | null>(null);
  const initializedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!initializedRef.current) {
      try {
        workerRef.current = new Worker(
          new URL("../workers/alarm-worker.ts", import.meta.url),
          { type: "module" }
        );
        workerRef.current.onmessage = (event: MessageEvent<AlarmMessage>) => {
          const message = event.data;
          if (message.type && handlerMap.has(message.type)) {
            const handler = handlerMap.get(message.type);
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
      }
    };
  }, []);

  const registerHandler = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (type: AlarmMessageType, handler: (payload: any) => void) => {
      handlerMap.set(type, handler);
    },
    []
  );

  const unregisterHandler = useCallback((type: AlarmMessageType) => {
    handlerMap.delete(type);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendMessage = useCallback((type: AlarmMessageType, payload: any) => {
    if (!workerRef.current) {
      throw new Error("Worker is not initialized");
    }
    const message: AlarmMessage = { type, payload };
    workerRef.current.postMessage(message);
  }, []);

  return { registerHandler, unregisterHandler, sendMessage };
};
