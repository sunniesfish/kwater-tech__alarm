import { useAlarmDockStore, useMusicDockStore } from "@/store/dock-store";
import { Button } from "../ui/button";
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

  useEffect(() => {
    setIsAlarmDeleteMode(false);
    setIsAlarmAddMode(false);
    setIsMusicDeleteMode(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <ul className="w-full flex justify-evenly items-center max-h-[80px] h-12 bg-card">
      <li>
        <Button
          variant={
            isAlarmDeleteMode || isMusicDeleteMode ? "destructive" : "outline"
          }
          onClick={handleDelBtnClick}
        >
          삭제
        </Button>
      </li>
      {current === View.Alarm ? (
        <li>
          <Button
            variant={isAlarmAddMode ? "default" : "outline"}
            onClick={handleAddBtnClick}
          >
            추가
          </Button>
        </li>
      ) : (
        <li>
          <input
            type="file"
            accept="audio/*"
            onChange={handleUploadMusic}
            ref={fileInputRef}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            추가
          </Button>
        </li>
      )}
    </ul>
  );
}
