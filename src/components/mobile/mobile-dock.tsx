import { useAlarmDockStore, useMusicDockStore } from "@/store/dock-store";
import { useEffect, useRef } from "react";
import { useNavStore, View } from "@/store/nav-store";
import { useShallow } from "zustand/react/shallow";
import { MusicMetadata } from "@/type/music-type";
import { Music } from "@/type/music-type";
import { useMusic } from "@/lib/use-music";
export default function MobileDock() {
  const {
    isDeleteMode: isAlarmDeleteMode,
    setIsDeleteMode: setIsAlarmDeleteMode,
    isAddMode: isAlarmAddMode,
    setIsAddMode: setIsAlarmAddMode,
  } = useAlarmDockStore(
    useShallow((state) => ({
      isDeleteMode: state.isDeleteMode,
      setIsDeleteMode: state.setIsDeleteMode,
      isAddMode: state.isAddMode,
      setIsAddMode: state.setIsAddMode,
    }))
  );

  const {
    isDeleteMode: isMusicDeleteMode,
    setIsDeleteMode: setIsMusicDeleteMode,
  } = useMusicDockStore(
    useShallow((state) => ({
      isDeleteMode: state.isDeleteMode,
      setIsDeleteMode: state.setIsDeleteMode,
    }))
  );
  const { current } = useNavStore();
  const { uploadMusic } = useMusic();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelBtnClick = () => {
    if (current === View.Alarm) {
      setIsAlarmDeleteMode(!isAlarmDeleteMode);
    } else if (current === View.Music) {
      setIsMusicDeleteMode(!isMusicDeleteMode);
    }
  };

  const handleAddBtnClick = () => {
    if (current === View.Alarm) {
      setIsAlarmAddMode(!isAlarmAddMode);
    }
  };

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

  useEffect(() => {
    setIsAlarmDeleteMode(false);
    setIsAlarmAddMode(false);
    setIsMusicDeleteMode(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <ul className="w-full flex justify-evenly items-center max-h-[80px] h-12 bg-card">
      <li className="dock-button-container">
        <button className="dock-button" onClick={handleDelBtnClick}>
          삭제
        </button>
      </li>
      {current === View.Alarm ? (
        <li className="dock-button-container">
          <button className="dock-button" onClick={handleAddBtnClick}>
            추가
          </button>
        </li>
      ) : (
        <li className="dock-button-container">
          <input
            type="file"
            accept=".mp3,.wav,.ogg,.aac,.m4a"
            onChange={handleUploadMusic}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            className="dock-button"
            onClick={() => fileInputRef.current?.click()}
          >
            추가
          </button>
        </li>
      )}
    </ul>
  );
}
