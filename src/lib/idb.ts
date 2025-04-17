import { DB_NAME, STORE_NAME, MusicDb, Music } from "@/type/music-type";
import { openDB } from "idb";

const musicDB = await openDB<MusicDb>(DB_NAME, 1, {
  upgrade(db) {
    const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
    store.createIndex("by_date", "upload_date");
  },
});

export async function addMusic(music: Music) {
  const size = music.file.size;
  if (size > 10 * 1024 * 1024) {
    throw new Error("File size is too large");
  }
  const tx = musicDB.transaction(STORE_NAME, "readwrite");
  try {
    await tx.store.add(music);
    await tx.done;
    return true;
  } catch (error) {
    tx.abort();
    throw error;
  }
}

export async function getMusicList() {
  const tx = musicDB.transaction(STORE_NAME, "readonly");
  try {
    const list = await tx.store.index("by_date").getAll();
    await tx.done;
    return list;
  } catch (error) {
    tx.abort();
    throw error;
  }
}

export async function getMusic(id: string) {
  const tx = musicDB.transaction(STORE_NAME, "readonly");
  try {
    const music = await tx.store.get(id);
    await tx.done;
    return music;
  } catch (error) {
    tx.abort();
    throw error;
  }
}

export async function deleteMusic(id: string) {
  const tx = musicDB.transaction(STORE_NAME, "readwrite");
  try {
    await tx.store.delete(id);
    await tx.done;
    return true;
  } catch (error) {
    tx.abort();
    throw error;
  }
}
