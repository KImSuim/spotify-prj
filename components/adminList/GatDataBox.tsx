"use client";

import fireStore from "@/firebase/firestore";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Album } from "@/common/Type/type";
import AlbumList from "./AlbumList";

const GatDataBoxTag = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  //useEffect를 사용하여 Firestore에서 데이터 가져오기
  useEffect(() => {
    const getAlbums = async () => {
      //Firestore에서 "Album" 컬렉션을 가져옴 (id , 내림차순 기준 정렬)
      const albumQuery = query(
        collection(fireStore, "Album"),
        orderBy("id", "desc")
      );
      //쿼리를 실행하여 데이터 가져오기
      const querySnapshot = await getDocs(albumQuery);
      //데이터를 Album 타입으로 변환하여 상태 업데이트
      setAlbums(querySnapshot.docs.map((doc) => doc.data() as Album));
    };
    getAlbums();
  }, []);

  return <AlbumList albums={albums} />;
};

export default GatDataBoxTag;
