import { useNavStore, View } from "@/store/nav-store";
import MusicList from "../music/music-list";
import AlarmList from "../alarm/alarm-list";

export default function MobileBody() {
  const current = useNavStore((state) => state.current);
  return <>{current === View.Music ? <MusicList /> : <AlarmList />}</>;
}
