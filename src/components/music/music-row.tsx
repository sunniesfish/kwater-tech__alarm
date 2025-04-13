import { MusicMetadata } from "@/type/music-type";
import { CardRow } from "../ui/card";
export default function MusicRow({
  music,
  onDelete,
}: {
  music: MusicMetadata;
  onDelete: (id: string) => void;
}) {
  return (
    <CardRow>
      <span>{music.name}</span>
      <button onClick={() => onDelete(music.id)}>삭제</button>
    </CardRow>
  );
}
