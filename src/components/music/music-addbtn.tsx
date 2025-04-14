import { Music, MusicMetadata } from "@/type/music-type";
import { CardRow } from "../ui/card";
import { useMusic } from "@/lib/use-music";
export default function MusicAddBtn() {
  const { uploadMusic } = useMusic();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "audio/mpeg") {
      alert("MP3 파일만 업로드 가능합니다.");
      return;
    }

    const musicMetaData: MusicMetadata = {
      name: file.name,
      id: crypto.randomUUID(),
      upload_date: new Date(),
    };

    const musicData: Music = {
      ...musicMetaData,
      file,
    };

    uploadMusic(musicData);
  };
  return (
    <CardRow className="text-card-foreground">
      <input type="file" accept="audio/*" onChange={handleChange} />
    </CardRow>
  );
}
