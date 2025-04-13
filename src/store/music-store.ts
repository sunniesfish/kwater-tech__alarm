import { MusicStore } from "@/type/music-type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMusicStore = create<MusicStore>()(
  persist(
    (set) => ({
      musicList: [],
      setMusicList: (musicList) => set({ musicList }),
      addMusic: (music) =>
        set((state) => ({ musicList: [...state.musicList, music] })),
      deleteMusic: (id) =>
        set((state) => ({
          musicList: state.musicList.filter((music) => music.id !== id),
        })),
    }),
    {
      name: "music-storage",
    }
  )
);
