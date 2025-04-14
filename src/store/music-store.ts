import { MusicStore } from "@/type/music-type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMusicStore = create<MusicStore>()(
  persist(
    (set, get) => ({
      musicList: [],
      setMusicList: (musicList) => set({ musicList }),
      addMusic: (music) => {
        const prevState = get().musicList;
        set({ musicList: [...prevState, music] });
        const undoFn = () => set({ musicList: prevState });
        return undoFn;
      },
      deleteMusic: (id) => {
        const prevState = get().musicList;
        set({ musicList: prevState.filter((music) => music.id !== id) });
        const undoFn = () => set({ musicList: prevState });
        return undoFn;
      },
    }),
    {
      name: "music-storage",
    }
  )
);
