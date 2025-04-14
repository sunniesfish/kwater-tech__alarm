import { useNavStore, View } from "../../store/nav-store";
import AlarmList from "../alarm/alarm-list";
import MusicList from "../music/music-list";
import NavBar from "./nav-bar";
import { DeviceType, useDeviceType } from "../../lib/use-device-type";
import MobileDoc from "./mobile-dock";
import AlarmMutation from "../alarm/alarm-mutation";
import ModalWrapper from "./modal-wrapper";
import { useAlarmDockStore } from "@/store/dock-store";
export default function MobileView() {
  const { current } = useNavStore();
  const isMobile = useDeviceType(DeviceType.Mobile);
  const { isAddMode, setIsAddMode } = useAlarmDockStore();
  return (
    <main className="w-full h-full grid grid-cols-1 grid-rows-[auto_1fr_auto] bg-background">
      {isMobile ? <NavBar /> : null}
      {current === View.Music ? <MusicList /> : <AlarmList />}
      {isMobile ? <MobileDoc /> : null}
      {isAddMode ? (
        <ModalWrapper isOpen={isAddMode} setIsOpen={setIsAddMode}>
          <AlarmMutation />
        </ModalWrapper>
      ) : null}
    </main>
  );
}
