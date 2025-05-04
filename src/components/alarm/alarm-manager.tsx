import { useEffect, useMemo, useRef, useState } from "react";
import { useAlarmWorker } from "../../lib/use-alarm-worker";
import { Alarm, AlarmMessageType, TriggerAlarm } from "../../type/alarm-type";
import { useAlarmStore } from "../../store/alarm-store";
import { getMusic } from "../../lib/idb";
import { Dialog, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogContent } from "../ui/dialog";
import { useShallow } from "zustand/react/shallow";

export function AlarmManager() {
  const { registerHandler, sendMessage } = useAlarmWorker();
  const { getAlarm, removeAlarm, alarmRecord, setAlarmRecord, updateAlarm } =
    useAlarmStore(
      useShallow((state) => ({
        getAlarm: state.getAlarm,
        removeAlarm: state.removeAlarm,
        alarmRecord: state.alarmRecord,
        setAlarmRecord: state.setAlarmRecord,
        updateAlarm: state.updateAlarm,
      }))
    );
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const ringAlarm = useMemo(() => {
    return async (musicId: string) => {
      let audioUrl: string;
      let audio: HTMLAudioElement;
      let isObjectUrl = false;

      try {
        if (musicId === "default") {
          audioUrl = "/default.mp3";
        } else {
          const music = await getMusic(musicId);
          if (!music) {
            console.error("음악을 찾을 수 없습니다.");
            return;
          }
          audioUrl = URL.createObjectURL(music.file);
          isObjectUrl = true;
        }

        audio = new Audio(audioUrl);

        audio.onended = () => {
          cleanupResources();
          setIsDialogOpen(false);
        };

        activeAudioRef.current = audio;
        setIsDialogOpen(true);

        await audio.play();

        function cleanupResources() {
          if (isObjectUrl) {
            URL.revokeObjectURL(audioUrl);
          }
          activeAudioRef.current = null;
        }

        return audio;
      } catch (error) {
        console.error("알람 재생 중 오류:", error);
        if (isObjectUrl) {
          URL.revokeObjectURL(audioUrl!);
        }
        activeAudioRef.current = null;
        return null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMusic]);

  const handleStopAlarm = () => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      if (activeAudioRef.current.src) {
        URL.revokeObjectURL(activeAudioRef.current.src);
      }
      activeAudioRef.current = null;
    }
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const handleAlarmTriggered = (payload: TriggerAlarm["payload"]) => {
      console.log("handleAlarmTriggered====================");
      const { alarmId } = payload;
      const alarm: Alarm | undefined = getAlarm(alarmId);
      if (!alarm) {
        return;
      }
      updateAlarm(alarmId, { ...alarm, lastTriggered: Date.now() });
      ringAlarm(alarm.musicId);
    };

    registerHandler(AlarmMessageType.TRIGGER_ALARM, handleAlarmTriggered);
  }, [
    getAlarm,
    registerHandler,
    removeAlarm,
    ringAlarm,
    setAlarmRecord,
    alarmRecord,
    updateAlarm,
  ]);

  useEffect(() => {
    console.log("updateAlarm", alarmRecord);
    sendMessage(AlarmMessageType.SET_ALARM, alarmRecord);
  }, [alarmRecord, sendMessage]);

  useEffect(() => {
    return () => {
      handleStopAlarm();
    };
  }, []);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-foreground">알람 종료</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex justify-center items-center">
          <Button variant="destructive" onClick={handleStopAlarm}>
            종료
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
