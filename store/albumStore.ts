import { create } from "zustand";
import fireStore from "@/firebase/firestore";
import {
  collection,
  getDocs,
  query,
  doc,
  setDoc,
  orderBy,
} from "firebase/firestore";
import { Album, AlbumStoreState } from "@/common/Type/type";

type AlbumStoreActions = {
  setField: <K extends keyof AlbumStoreState>(
    field: K,
    value: AlbumStoreState[K]
  ) => void;
  fetchNextId: () => Promise<void>;
  onClickUploadButton: () => Promise<void>;
  getAlbums: () => Promise<void>;
};

export const useAlbumStore = create<AlbumStoreState & AlbumStoreActions>(
  (set) => ({
    albumName: "",
    artistName: "",
    genres: [],
    popularity: 0,
    followers: 0,
    artistsImageUrl: "",
    albumImageUrl: "",
    releaseDate: "",
    trackName: "",
    trackDuration: "",
    albums: [],
    nextId: 1,

    setField: (field, value) => set((state) => ({ ...state, [field]: value })),

    fetchNextId: async () => {
      const querySnapshot = await getDocs(collection(fireStore, "Album"));
      const albumList = querySnapshot.docs.map((doc) => doc.data() as Album);
      set({
        nextId: albumList.length
          ? Math.max(...albumList.map((album) => album.id)) + 1
          : 1,
      });
    },

    onClickUploadButton: async () => {
      const state = useAlbumStore.getState();
      if (!state.albumName.trim()) return;

      const randomId = crypto.randomUUID();
      const albumRef = doc(fireStore, "Album", randomId);
      await setDoc(albumRef, {
        id: state.nextId,
        albumsName: state.albumName,
        artistName: state.artistName,
        genres: state.genres.length > 0 ? state.genres : ["pop"],
        popularity: state.popularity,
        followers: state.followers,
        artistsImageUrl: state.artistsImageUrl,
        albumImageUrl: state.albumImageUrl,
        releaseDate: state.releaseDate,
        trackName: state.trackName,
        trackDuration: state.trackDuration,
      });

      set({
        albumName: "",
        artistName: "",
        genres: [],
        popularity: 0,
        followers: 0,
        artistsImageUrl: "",
        albumImageUrl: "",
        releaseDate: "",
        trackName: "",
        trackDuration: "",
      });

      await useAlbumStore.getState().fetchNextId();
      await useAlbumStore.getState().getAlbums();
    },

    getAlbums: async () => {
      const albumQuery = query(collection(fireStore, "Album"), orderBy("id"));
      const querySnapshot = await getDocs(albumQuery);
      set({ albums: querySnapshot.docs.map((doc) => doc.data() as Album) });
    },
  })
);
