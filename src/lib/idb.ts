import { DB_NAME, STORE_NAME, MusicDb } from "@/type/music-type";
import { openDB } from "idb";

const musicDB = await openDB<MusicDb>(DB_NAME, 1, {
  upgrade(db) {
    const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
    store.createIndex("by_date", "upload_date");
  },
});

export async function addMusic(musicfile: Blob, name: string) {
  const size = musicfile.size;
  if (size > 10 * 1024 * 1024) {
    throw new Error("File size is too large");
  }
  const music = {
    id: crypto.randomUUID(),
    name: name,
    file: musicfile,
    upload_date: new Date(),
  };
  await musicDB.add(STORE_NAME, music);
}

export async function getMusicList() {
  return await musicDB.getAllFromIndex(STORE_NAME, "by_date");
}

export async function getMusic(id: string) {
  return await musicDB.get(STORE_NAME, id);
}

export async function deleteMusic(id: string) {
  await musicDB.delete(STORE_NAME, id);
}
