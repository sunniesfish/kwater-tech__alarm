import DesktopView from "./components/common/desktop-view";
import Header from "./components/common/header";
import MobileView from "./components/common/mobile-view";
import { AlarmManager } from "./components/alarm/alarm-manager";
import { DeviceType, useDeviceType } from "./lib/use-device-type";

function App() {
  const isMobile = useDeviceType(DeviceType.Mobile);
  return (
    <>
      <Header />
      {isMobile ? <MobileView /> : <DesktopView />}
      <AlarmManager />
    </>
  );
}

export default App;
