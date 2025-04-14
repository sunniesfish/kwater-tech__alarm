import ListWrapper from "../common/list-wrapper";
import { useMusicStore } from "@/store/music-store";
import MusicRow from "./music-row";
import { DeviceType, useDeviceType } from "@/lib/use-device-type";
import MusicAddBtn from "./music-addbtn";

export default function MusicList() {
  const { musicList, deleteMusic } = useMusicStore();
  const isMobile = useDeviceType(DeviceType.Mobile);

  const handleDelete = (id: string) => {
    deleteMusic(id);
  };

  return (
    <ListWrapper>
      <h1>MusicList</h1>
      <ul>
        {isMobile ? <MusicAddBtn /> : null}
        {musicList.map((music) => (
          <MusicRow key={music.id} music={music} onDelete={handleDelete} />
        ))}
      </ul>
    </ListWrapper>
  );
}
