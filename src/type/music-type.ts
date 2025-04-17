import { DBSchema } from "idb";

export const DB_NAME = "music-db";
export const STORE_NAME = "alarm-music";

export interface Music extends MusicMetadata {
  file: Blob;
}

export interface MusicMetadata {
  id: string;
  name: string;
  upload_date: Date;
  duration: number;
}

export interface MusicDb extends DBSchema {
  [STORE_NAME]: {
    key: string;
    indexes: {
      by_date: Date;
    };
    value: Music;
  };
}

export interface MusicStore {
  musicList: MusicMetadata[];
  setMusicList: (musicList: MusicMetadata[]) => void;
  addMusic: (music: MusicMetadata) => () => void;
  deleteMusic: (id: string) => () => void;
}
