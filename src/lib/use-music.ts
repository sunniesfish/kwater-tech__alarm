import { Music } from "@/type/music-type";
import { useEffect } from "react";
import { addMusic, deleteMusic, getMusicList } from "./idb";
import { useMusicStore } from "@/store/music-store";

export const useMusic = () => {
  const {
    musicList,
    addMusic: addMusicToStore,
    setMusicList,
    deleteMusic: deleteMusicFromStore,
  } = useMusicStore();

  useEffect(() => {
    const fetchMusicList = async () => {
      const musicList = await getMusicList();
      setMusicList(musicList);
    };
    fetchMusicList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadMusic = async (music: Music) => {
    try {
      const rollback = addMusicToStore(music);
      try {
        await addMusic(music);
      } catch (error) {
        rollback();
        throw error;
      }
    } catch (error) {
      console.error(error);
      alert("음악 업로드에 실패했습니다.");
    }
  };

  const removeMusic = async (id: string) => {
    try {
      const rollback = deleteMusicFromStore(id);
      try {
        const result = await deleteMusic(id);
        console.log("resutl ", result);
      } catch (error) {
        rollback();
        throw error;
      }
    } catch (error) {
      console.error(error);
      alert("음악 삭제에 실패했습니다.");
    }
  };

  return { musicList, uploadMusic, removeMusic };
};
