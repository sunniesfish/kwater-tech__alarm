import ListWrapper from "../common/list-wrapper";
import AlarmRow from "./alarm-row";
import { useAlarm } from "@/lib/use-alarm";

export default function AlarmList() {
  const { alarmList, deleteAlarm } = useAlarm();
  return (
    <ListWrapper>
      <h1>알람 목록</h1>
      <ul>
        {alarmList.map((alarm) => (
          <li key={alarm.id}>
            <AlarmRow alarm={alarm} onDelete={() => deleteAlarm(alarm.id)} />
          </li>
        ))}
      </ul>
    </ListWrapper>
  );
}
