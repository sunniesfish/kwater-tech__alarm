import { useNavStore, View } from "../../store/nav-store";
import AlarmList from "../alarm/alarm-list";
import MusicList from "../music/music-list";

export default function MobileView() {
  const { current } = useNavStore();
  return (
    <main className="w-full h-full">
      {current === View.Music ? <MusicList /> : <AlarmList />}
    </main>
  );
}
