import { Alarm } from "@/type/alarm-type";
import { CardRow } from "../ui/card";
export default function AlarmRow({
  alarm,
  onDelete,
}: {
  alarm: Alarm;
  onDelete: () => void;
}) {
  return (
    <CardRow>
      <span>{alarm.day}</span>
      <span>{alarm.hour}</span>
      <span>{alarm.minute}</span>
      <button onClick={onDelete}>삭제</button>
    </CardRow>
  );
}
