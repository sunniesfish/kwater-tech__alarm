import { Alarm } from "@/type/alarm-type";
import { CardRow } from "../ui/card";
import { useAlarmDockStore } from "@/store/dock-store";
import { Toggle } from "../ui/toggle";
import { Check } from "lucide-react";
import { memo } from "react";
import { useAlarm } from "@/lib/use-alarm";
export default memo(function AlarmRow({ alarm }: { alarm: Alarm }) {
  const isDeleteMode = useAlarmDockStore((state) => state.isDeleteMode);
  const { deleteAlarm, updateAlarm } = useAlarm();
  return (
    <CardRow className="text-card-foreground justify-between grid grid-cols-[auto_1fr_auto_auto]">
      <div className="flex items-center">
        <span className="text-lg font-semibold mr-2">
          {alarm.hour}:{alarm.minute.toString().padStart(2, "0")}
        </span>
        <span className="text-base font-semibold text-muted-foreground">
          {alarm.day}
        </span>
      </div>

      <div className="flex-1 truncate">
        <span className="font-medium">{alarm.title}</span>
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
      </div>

      {isDeleteMode ? (
        <button
          className="text-destructive hover:text-destructive/80  px-3 py-1 rounded-md hover:bg-destructive/10"
          onClick={() => deleteAlarm(alarm.id)}
          aria-label="알람 삭제"
        >
          삭제
        </button>
      ) : null}
    </CardRow>
  );
});
