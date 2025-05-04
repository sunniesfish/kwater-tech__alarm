import { useAlarmInfoModalStore } from "@/store/alarm-info-modal-store";
import ModalWrapper from "../common/modal-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useShallow } from "zustand/react/shallow";
import { Day } from "@/type/alarm-type";

const DAYS: { key: Day; label: string }[] = [
  { key: Day.SUNDAY, label: "일" },
  { key: Day.MONDAY, label: "월" },
  { key: Day.TUESDAY, label: "화" },
  { key: Day.WEDNESDAY, label: "수" },
  { key: Day.THURSDAY, label: "목" },
  { key: Day.FRIDAY, label: "금" },
  { key: Day.SATURDAY, label: "토" },
];

export default function AlarmInfoModal() {
  const { isOpen, setIsOpen, alarm } = useAlarmInfoModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      setIsOpen: state.setIsOpen,
      alarm: state.alarm,
    }))
  );

  if (!alarm) return null;

  const formattedTime = `${alarm.hour
    .toString()
    .padStart(2, "0")}:${alarm.minute.toString().padStart(2, "0")}`;

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">{alarm.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex justify-center gap-2">
              {DAYS.map((d) => (
                <span
                  key={d.key}
                  className={
                    alarm.day.includes(d.key)
                      ? "bg-primary text-primary-foreground rounded px-2 py-1 font-semibold"
                      : "text-muted-foreground px-2 py-1"
                  }
                >
                  {d.label}
                </span>
              ))}
            </div>
            <div className="flex justify-center items-center gap-2">
              <span className="text-2xl font-mono">{formattedTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </ModalWrapper>
  );
}
