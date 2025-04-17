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
  console.log("AlarmManager");
  const { registerHandler, sendMessage } = useAlarmWorker();
  const { getAlarm, removeAlarm, alarmList } = useAlarmStore(
    useShallow((state) => ({
      getAlarm: state.getAlarm,
      removeAlarm: state.removeAlarm,
      alarmList: state.alarmList,
    }))
  );
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const ringAlarm = useMemo(() => {
    console.log("ringAlarm");
    return async (musicId: string) => {
      let audioUrl: string;
      let audio: HTMLAudioElement;

      if (musicId === "default") {
        // default.mp3 파일 사용
        audioUrl = "/default.mp3";
        audio = new Audio(audioUrl);
      } else {
        // IndexedDB에서 음악 가져오기
        const music = await getMusic(musicId);
        if (!music) {
          return;
        }
        audioUrl = URL.createObjectURL(music.file);
        audio = new Audio(audioUrl);
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          activeAudioRef.current = null;
        };
      }

      activeAudioRef.current = audio;
      setIsDialogOpen(true);

      audio.play().catch((error) => {
        console.error(error);
        URL.revokeObjectURL(audioUrl);
        activeAudioRef.current = null;
      });
      return audio;
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
      const { alarmId } = payload;
      const alarm: Alarm | undefined = getAlarm(alarmId);
      if (!alarm) {
        return;
      }
      ringAlarm(alarm.musicId);
      if (alarm.repeat) {
        alarm.lastTriggered = Date.now();
        return;
      } else {
        removeAlarm(alarmId);
      }
    };

    registerHandler(AlarmMessageType.TRIGGER_ALARM, handleAlarmTriggered);
  }, [getAlarm, registerHandler, removeAlarm, ringAlarm]);

  useEffect(() => {
    sendMessage(AlarmMessageType.SET_ALARM, alarmList);
  }, [alarmList, sendMessage]);

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
