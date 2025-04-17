import DesktopView from "./components/desktop/desktop-view";
import MainHeader from "./components/common/main-header";
import MobileView from "./components/mobile/mobile-view";
import { AlarmManager } from "./components/alarm/alarm-manager";
import { DeviceType, useDeviceType } from "./lib/use-device-type";
import Footer from "./components/desktop/footer";

function App() {
  console.log("App");
  const isMobile = useDeviceType(DeviceType.Mobile);
  return (
    <>
      <MainHeader />
      {isMobile ? <MobileView /> : <DesktopView />}
      {!isMobile && <Footer />}
      <AlarmManager />
    </>
  );
}

export default App;
