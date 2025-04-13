import "./App.css";
import DesktopView from "./components/common/desktop-view";
import Header from "./components/common/header";
import MobileView from "./components/common/mobile-view";
import NavBar from "./components/common/nav-bar";
import { DeviceType, useDeviceType } from "./lib/use-device-type";
import { AlarmManager } from "./components/alarm/alarm-manager";
import MobileDoc from "./components/common/mobile-dock";
function App() {
  const isMobile = useDeviceType(DeviceType.Mobile);
  return (
    <>
      <Header />
      {isMobile ? <NavBar /> : null}
      {isMobile ? <MobileView /> : <DesktopView />}
      {isMobile ? <MobileDoc /> : null}
      <AlarmManager />
    </>
  );
}

export default App;
