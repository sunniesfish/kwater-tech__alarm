import AlarmList from "../alarm/alarm-list";
import AlarmMutationCard from "../alarm/alarm-mutation-card";
import ListHeader from "../common/list-header";
import MusicList from "../music/music-list";
import AlarmInfoModal from "../alarm/alarm-info-modal";
export default function DesktopView() {
  return (
    <>
      <main className="w-full h-full min-h-0 grid grid-cols-3 gap-3 bg-background">
        <div className="grid grid-cols-1 grid-rows-[auto_1fr] h-full min-h-0">
          <ListHeader title="알람음 목록" />
          <MusicList />
        </div>
        <div className="grid grid-cols-1 grid-rows-[auto_1fr] h-full min-h-0">
          <ListHeader title="알람 목록" />
          <AlarmList />
        </div>
        <div className="grid grid-cols-1 grid-rows-[auto_1fr] h-full min-h-0">
          <ListHeader title="알람 추가" />
          <AlarmMutationCard />
        </div>
      </main>
      <AlarmInfoModal />
    </>
  );
}
