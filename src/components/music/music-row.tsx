import { MusicMetadata } from "@/type/music-type";
import { CardRow } from "../ui/card";
import { useMusicDockStore } from "@/store/dock-store";
export default function MusicRow({
  music,
  onDelete,
}: {
  music: MusicMetadata;
  onDelete: (id: string) => void;
}) {
  const { isDeleteMode } = useMusicDockStore();
  return (
    <CardRow className="text-card-foreground">
      <span>{music.name}</span>
      {isDeleteMode ? (
        <button
          className="text-destructive hover:text-destructive/80"
          onClick={() => onDelete(music.id)}
        >
          삭제
        </button>
      ) : null}
    </CardRow>
  );
}
