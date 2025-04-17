import { MusicMetadata } from "@/type/music-type";
import { CardRow } from "../ui/card";
import { useMusicDockStore } from "@/store/dock-store";
import { formatDuration } from "@/lib/utils";

export default function MusicRow({
  music,
  onDelete,
}: {
  music: MusicMetadata;
  onDelete: (id: string) => void;
}) {
  const isDeleteMode = useMusicDockStore((state) => state.isDeleteMode);
  const handleDelete = () => {
    onDelete(music.id);
  };

  return (
    <CardRow className="text-card-foreground justify-between grid grid-cols-[1fr_auto_auto]">
      <div className="flex-1 truncate">
        <span className="font-medium">{music.name}</span>
      </div>

      <div className="text-muted-foreground flex-shrink-0 w-10 text-right">
        {formatDuration(music.duration)}
      </div>

      {isDeleteMode ? (
        <button
          className="text-destructive hover:text-destructive/80 ml-4 px-3 py-1 rounded-md hover:bg-destructive/10 flex-shrink-0"
          onClick={handleDelete}
          aria-label="음악 삭제"
        >
          삭제
        </button>
      ) : null}
    </CardRow>
  );
}
