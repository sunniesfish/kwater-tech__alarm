import AlarmList from "../alarm/alarm-list";
import AlarmMutation from "../alarm/alarm-mutation";
import MusicList from "../music/music-list";
export default function DesktopView() {
  console.log("DesktopView");
  return (
    <main className="w-full h-full grid grid-cols-3 gap-3">
      <MusicList />
      <AlarmList />
      <AlarmMutation />
    </main>
  );
}
