import DesktopView from "./components/desktop/desktop-view";
import Header from "./components/common/header";
import MobileView from "./components/mobile/mobile-view";
import { AlarmManager } from "./components/alarm/alarm-manager";
import { DeviceType, useDeviceType } from "./lib/use-device-type";

function App() {
  console.log("App");
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
