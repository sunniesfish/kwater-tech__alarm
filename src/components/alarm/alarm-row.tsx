import { Alarm } from "@/type/alarm-type";
import { CardRow } from "../ui/card";
import { useAlarmDockStore } from "@/store/dock-store";
import { Toggle } from "../ui/toggle";
import { Check } from "lucide-react";
import { memo } from "react";
import { useAlarm } from "@/lib/use-alarm";
import { useAlarmInfoModalStore } from "@/store/alarm-info-modal-store";
import { useShallow } from "zustand/react/shallow";
export default memo(function AlarmRow({ alarm }: { alarm: Alarm }) {
  const isDeleteMode = useAlarmDockStore((state) => state.isDeleteMode);
  const { deleteAlarm, updateAlarm } = useAlarm();
  const { setIsOpen, setAlarm } = useAlarmInfoModalStore(
    useShallow((state) => ({
      setIsOpen: state.setIsOpen,
      setAlarm: state.setAlarm,
    }))
  );
  return (
    <CardRow className="text-card-foreground justify-between grid grid-cols-[1fr_auto] overflow-hidden">
      <div
        className="grid grid-cols-[auto_1fr] cursor-pointer items-center gap-2"
        onClick={() => {
          setIsOpen(true);
          setAlarm(alarm);
        }}
      >
        <div className="flex items-center">
          <span className="text-lg font-semibold mr-2">
            {alarm.hour}:{alarm.minute.toString().padStart(2, "0")}
          </span>
        </div>

        <div className="flex-1 truncate">
          <span className="font-medium">{alarm.title}</span>
        </div>
      </div>
      <div>
        <Toggle
          pressed={alarm.isActive}
          onPressedChange={(pressed) =>
            updateAlarm(alarm.id, { ...alarm, isActive: pressed })
          }
        >
          <Check />
        </Toggle>

        {isDeleteMode ? (
          <button
            className="text-destructive hover:text-destructive/80  px-3 py-1 rounded-md hover:bg-destructive/10 ml-2"
            onClick={() => deleteAlarm(alarm.id)}
            aria-label="알람 삭제"
          >
            삭제
          </button>
        ) : null}
      </div>
    </CardRow>
  );
});
