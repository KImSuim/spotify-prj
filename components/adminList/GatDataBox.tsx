"use client";

import fireStore from "@/firebase/firestore";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AlbumList } from "./AlbumList";
import { Album } from "@/common/Type/type";

const GatDataBoxTag = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const getAlbums = async () => {
      const albumQuery = query(collection(fireStore, "Album"), orderBy("id"));
      const querySnapshot = await getDocs(albumQuery);
      setAlbums(querySnapshot.docs.map((doc) => doc.data() as Album));
    };
    getAlbums();
  }, []);

  return <AlbumList albums={albums} />;
};

export default GatDataBoxTag;
