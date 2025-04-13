import ListWrapper from "../common/list-wrapper";
import { useMusicStore } from "@/store/music-store";
import MusicRow from "./music-row";

export default function MusicList() {
  const { musicList, deleteMusic } = useMusicStore();

  const handleDelete = (id: string) => {
    deleteMusic(id);
  };

  return (
    <ListWrapper>
      <h1>MusicList</h1>
      <ul>
        {musicList.map((music) => (
          <MusicRow key={music.id} music={music} onDelete={handleDelete} />
        ))}
      </ul>
    </ListWrapper>
  );
}
