"use client";

import fireStore from "@/firebase/firestore";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
// import SetDataBoxTag from "@/components/tag/SetDataBox";
// import GatDataBoxTag from "@/components/tag/GatDataBox";
import AlbumComponent from "@/components/AlbumComponent";
import SetDataBoxTag from "@/components/adminList/SetDataBox";
import GatDataBoxTag from "@/components/adminList/GatDataBox";

const initialFormData = {
  albumsName: "",
  artistName: "",
  genres: [""],
  popularity: 0,
  followers: 0,
  artistsImageUrl: "",
  albumImageUrl: "",
  releaseDate: "",
  trackName: "",
  trackDuration: "",
};

const AdminPage = () => {
  const [formData, setFormData] = useState(initialFormData);

  const inputFields: {
    key: keyof typeof formData;
    label: string;
    type: "text" | "number";
  }[] = [
    { key: "albumsName", label: "앨범 이름", type: "text" },
    { key: "releaseDate", label: "발행일", type: "text" },
    { key: "artistName", label: "아티스트", type: "text" },
    { key: "genres", label: "장르 (쉼표로 구분)", type: "text" },
    { key: "albumImageUrl", label: "앨범 이미지", type: "text" },
    { key: "artistsImageUrl", label: "아티스트 이미지", type: "text" },
    { key: "popularity", label: "인기도 점수", type: "number" },
    { key: "followers", label: "팔로워 수", type: "number" },
    { key: "trackName", label: "트랙 이름(노래 제목)", type: "text" },
    { key: "trackDuration", label: "트랙(노래) 재생시간", type: "text" },
  ];

  // 앨범 업로드 버튼 클릭 시 호출되는 함수
  const onClickUpLoadButton = async () => {
    if (!formData.albumsName.trim()) {
      return;
    }

    const albumRef = doc(collection(fireStore, "Album"));
    const albumData = {
      id: Math.floor(Math.random() * 1000000).toString(16),
      ...formData,
    };

    await setDoc(albumRef, albumData);
    setFormData(initialFormData);
  };

  const handleInputChange = (
    fieldName: keyof typeof formData,
    value: string
  ) => {
    console.log(`변경됨: ${fieldName} = ${value}`);
    setFormData((prev) => ({
      ...prev,
      [fieldName]:
        fieldName === "genres"
          ? value.split(",").map((genre) => genre.trim()) // 장르는 배열 변환
          : value, // 나머지는 문자열 그대로 저장
    }));
  };

  return (
    <div className="p-5 text-white ">
      <AlbumComponent />
      <h2 className="my-4 text-3xl font-bold">앨범 추가를 해주세요</h2>
      <div className="flex flex-col items-start gap-2">
        <div className="grid justify-start gap-4 lg:grid-cols-2">
          {inputFields.map(({ key, label, type }) => (
            <SetDataBoxTag
              key={key}
              inputInfo={label}
              inputValue={formData[key as keyof typeof formData].toString()}
              inputType={type}
              onInputChange={(value) => {
                console.log(`🔥 ${key} 변경됨: ${value}`);
                handleInputChange(key, String(value));
              }}
            />
          ))}
        </div>
      </div>
      <button
        onClick={onClickUpLoadButton}
        className="px-3 py-2 mt-2 text-black bg-yellow-200 border-2 border-white w-52"
      >
        앨범 저장
      </button>
      <h2
        className="my-4 text-3xl font-bold "
        // style={{ fontWeight: "bold", fontSize: "30px", marginTop: "10px" }}
      >
        앨범 리스트
      </h2>
      <GatDataBoxTag />
    </div>
  );
};

export default AdminPage;
