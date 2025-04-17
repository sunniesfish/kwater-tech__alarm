import ListWrapper from "../common/list-wrapper";
import { useMusicStore } from "@/store/music-store";
import MusicRow from "./music-row";
import MusicMutationRow from "./music-mutation-row";
import { useMusic } from "@/lib/use-music";
import { DeviceType, useDeviceType } from "@/lib/use-device-type";

export default function MusicList() {
  const musicList = useMusicStore((state) => state.musicList);
  const { removeMusic } = useMusic();
  const isDesktop = useDeviceType(DeviceType.Desktop);

  const handleDelete = (id: string) => {
    removeMusic(id);
  };

  return (
    <ListWrapper>
      {isDesktop && <MusicMutationRow />}
      <ul className="h-full overflow-y-auto no-scrollbar px-2">
        {musicList.map((music) => (
          <MusicRow key={music.id} music={music} onDelete={handleDelete} />
        ))}
      </ul>
    </ListWrapper>
  );
}
