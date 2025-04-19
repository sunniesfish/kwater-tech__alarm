import { Music, MusicMetadata } from "@/type/music-type";
import { useMusic } from "@/lib/use-music";
import { Button } from "../ui/button";
import { useMusicDockStore } from "@/store/dock-store";
import { useShallow } from "zustand/react/shallow";
import { useRef } from "react";
export default function MusicMutationRow() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadMusic } = useMusic();
  const { setIsDeleteMode, isDeleteMode } = useMusicDockStore(
    useShallow((state) => ({
      setIsDeleteMode: state.setIsDeleteMode,
      isDeleteMode: state.isDeleteMode,
    }))
  );

  const handleUploadMusic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const supportedTypes = [
      "audio/mpeg", // MP3
      "audio/wav", // WAV
      "audio/ogg", // OGG
      "audio/aac", // AAC
      "audio/mp4", // M4A
      "audio/x-m4a", // M4A (대체 MIME 타입)
    ];

    if (!supportedTypes.includes(file.type)) {
      alert(
        "지원되지 않는 오디오 파일입니다. MP3, WAV, OGG, AAC, M4A 파일만 업로드 가능합니다."
      );
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("10MB 이하의 파일만 업로드 가능합니다.");
      return;
    }

    try {
      const testAudio = new Audio();
      const fileURL = URL.createObjectURL(file);
      testAudio.src = fileURL;

      const errorHandler = () => {
        alert("이 오디오 파일은 브라우저에서 재생할 수 없습니다.");
        cleanupResources();
      };

      const metadataHandler = () => {
        const musicMetaData: MusicMetadata = {
          name: file.name,
          id: crypto.randomUUID(),
          upload_date: new Date(),
          duration: testAudio.duration,
        };

        const musicData: Music = {
          ...musicMetaData,
          file,
        };

        uploadMusic(musicData);
        cleanupResources();
      };

      const cleanupResources = () => {
        URL.revokeObjectURL(fileURL);
        testAudio.removeEventListener("error", errorHandler);
        testAudio.removeEventListener("loadedmetadata", metadataHandler);
        testAudio.src = "";
      };

      testAudio.addEventListener("error", errorHandler);
      testAudio.addEventListener("loadedmetadata", metadataHandler);
    } catch {
      alert("오디오 파일 처리 중 오류가 발생했습니다.");
    }
  };
  return (
    <div className="flex justify-end items-center gap-2">
      <Button
        variant={isDeleteMode ? "outline" : "delete"}
        onClick={() => setIsDeleteMode(!isDeleteMode)}
      >
        {isDeleteMode ? "완료" : "삭제"}
      </Button>
      <input
        type="file"
        accept="audio/*"
        onChange={handleUploadMusic}
        ref={fileInputRef}
        className="hidden"
      />
      <Button onClick={() => fileInputRef.current?.click()}>추가</Button>
    </div>
  );
}
