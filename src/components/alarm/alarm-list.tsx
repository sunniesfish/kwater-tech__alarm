import { useCallback } from "react";
import ListWrapper from "../common/list-wrapper";
import AlarmRow from "./alarm-row";
import { useAlarm } from "@/lib/use-alarm";
import { useAlarmStore } from "@/store/alarm-store";
import AlarmMutationRow from "./alarm-mutation-row";
import { DeviceType, useDeviceType } from "@/lib/use-device-type";
export default function AlarmList() {
  console.log("AlarmList");
  const isDesktop = useDeviceType(DeviceType.Desktop);
  const { deleteAlarm } = useAlarm();
  const alarmList = useAlarmStore((state) => state.alarmList);
  const onDelete = useCallback(
    (id: string) => {
      deleteAlarm(id);
    },
    [deleteAlarm]
  );
  return (
    <ListWrapper>
      {isDesktop && <AlarmMutationRow />}
      <ul className="h-full overflow-y-scroll no-scrollbar px-2">
        {alarmList.map((alarm) => (
          <li key={alarm.id}>
            <AlarmRow alarm={alarm} onDelete={() => onDelete(alarm.id)} />
          </li>
        ))}
      </ul>
    </ListWrapper>
  );
}
