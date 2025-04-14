import { Alarm } from "@/type/alarm-type";
import { CardRow } from "../ui/card";
import { useAlarmDockStore } from "@/store/dock-store";
export default function AlarmRow({
  alarm,
  onDelete,
}: {
  alarm: Alarm;
  onDelete: () => void;
}) {
  const { isDeleteMode } = useAlarmDockStore();
  return (
    <CardRow className="text-card-foreground">
      <span>{alarm.day}</span>
      <span>{alarm.hour}</span>
      <span>{alarm.minute}</span>

      {isDeleteMode ? (
        <button
          className="text-destructive hover:text-destructive/80"
          onClick={onDelete}
        >
          삭제
        </button>
      ) : null}
    </CardRow>
  );
}
