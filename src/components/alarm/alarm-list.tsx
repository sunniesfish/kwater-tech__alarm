import ListWrapper from "../common/list-wrapper";
import AlarmRow from "./alarm-row";
import { useAlarmStore } from "@/store/alarm-store";
import AlarmMutationRow from "./alarm-mutation-row";
import { DeviceType, useDeviceType } from "@/lib/use-device-type";
export default function AlarmList() {
  const isDesktop = useDeviceType(DeviceType.Desktop);
  const alarmRecord = useAlarmStore((state) => state.alarmRecord);

  return (
    <ListWrapper>
      {isDesktop && <AlarmMutationRow />}
      <ul className="h-full overflow-y-scroll no-scrollbar px-2">
        {Object.values(alarmRecord).map((alarm) => (
          <AlarmRow key={alarm.id} alarm={alarm} />
        ))}
      </ul>
    </ListWrapper>
  );
}
