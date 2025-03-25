"use client";

import { useState } from "react";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

const DeleteAlbumButton = () => {
  const [albumId, setAlbumId] = useState(""); // 앨범 ID 상태
  const [message, setMessage] = useState(""); // 사용자에게 보여줄 메시지 상태

  const handleDelete = async () => {
    if (!albumId.trim()) {
      setMessage("앨범 ID를 입력하세요.");
      return;
    }

    try {
      // 문서 참조를 가져옵니다.
      const albumRef = doc(fireStore, "Album", albumId); // "Album" 컬렉션 내 문서
      const albumDoc = await getDoc(albumRef);

      // 앨범이 존재하지 않으면
      if (!albumDoc.exists()) {
        setMessage("해당 앨범이 존재하지 않습니다.");
        return;
      }

      // 앨범 문서의 모든 필드를 삭제
      const albumData = albumDoc.data();
      const updates: { [key: string]: any } = {};

      // 문서의 모든 필드에 대해 deleteField() 적용
      Object.keys(albumData).forEach((key) => {
        updates[key] = deleteField(); // deleteField()를 필드마다 할당
      });

      // 업데이트
      await updateDoc(albumRef, updates);

      setMessage(`앨범 (ID: ${albumId})의 모든 필드가 삭제되었습니다.`);
      setAlbumId(""); // 삭제 후 앨범 ID 초기화
    } catch (error) {
      console.error("삭제 실패:", error);
      setMessage("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 mt-4">
      <input
        type="text"
        value={albumId}
        onChange={(e) => setAlbumId(e.target.value)}
        placeholder="앨범 ID 입력"
        className="px-2 py-1 border border-gray-400 rounded-md"
      />
      <button
        onClick={handleDelete}
        className="px-3 py-2 mt-2 text-white bg-red-500 border-2 border-white w-52"
      >
        앨범의 모든 필드 삭제
      </button>

      {message && <div className="mt-2 text-sm text-red-500">{message}</div>}
    </div>
  );
};

export default DeleteAlbumButton;
