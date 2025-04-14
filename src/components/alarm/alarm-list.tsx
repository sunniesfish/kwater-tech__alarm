import { useCallback } from "react";
import ListWrapper from "../common/list-wrapper";
import AlarmRow from "./alarm-row";
import { useAlarm } from "@/lib/use-alarm";
import { useAlarmDockStore } from "@/store/dock-store";
export default function AlarmList() {
  const { alarmList, deleteAlarm } = useAlarm();
  const { setIsDeleteMode } = useAlarmDockStore();
  const onDelete = useCallback(
    (id: string) => {
      deleteAlarm(id);
      setIsDeleteMode(false);
    },
    [deleteAlarm, setIsDeleteMode]
  );
  return (
    <ListWrapper>
      <h1>알람 목록</h1>
      <ul>
        {alarmList.map((alarm) => (
          <li key={alarm.id}>
            <AlarmRow alarm={alarm} onDelete={() => onDelete(alarm.id)} />
          </li>
        ))}
      </ul>
    </ListWrapper>
  );
}
