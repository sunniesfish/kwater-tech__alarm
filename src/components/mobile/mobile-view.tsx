import MobileDoc from "./mobile-dock";
import AlarmMutationModal from "../alarm/alarm-mutation-modal";
import MobileBody from "./mobile-body";
import NavBar from "./nav-bar";
export default function MobileView() {
  return (
    <main className="w-full h-full grid grid-cols-1 grid-rows-[auto_1fr_auto] bg-background">
      <NavBar />
      <MobileBody />
      <MobileDoc />
      <AlarmMutationModal />
    </main>
  );
}
