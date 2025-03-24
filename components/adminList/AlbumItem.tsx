"use client";

import Image from "next/image";
import { Album } from "@/common/Type/type";

export const AlbumItem = ({ album }: { album: Album }) => {
  // 텍스트 정보 배열
  const textInfo = [
    { label: "ID", value: album.id },
    { label: "앨범이름", value: album.albumsName },
    { label: "발행일", value: album.releaseDate },
    { label: "아티스트", value: album.artistName },
    { label: "인기도", value: album.popularity },
    { label: "팔로워", value: album.followers },
    { label: "장르", value: album.genres.join(", ") },
    { label: "트랙(노래 제목)", value: album.trackName },
    { label: "재생시간", value: album.trackDuration },
  ];

  // 이미지 정보 배열
  const imageInfo = [
    { src: album.albumImageUrl, alt: album.albumsName, label: "앨범 이미지" },
    {
      src: album.artistsImageUrl,
      alt: album.artistName,
      label: "아티스트 이미지",
    },
  ];

  return (
    <li className="p-1 mb-2 border-2">
      {/* 텍스트 정보 렌더링 */}
      {textInfo.map((info) => (
        <p key={info.label}>
          {info.label} : {info.value}
        </p>
      ))}

      {/* 이미지 정보 렌더링 */}
      <div className="flex">
        {imageInfo.map((image) =>
          image.src ? (
            <Image
              key={image.label}
              src={image.src}
              alt={image.alt}
              width={100}
              height={100}
              className="rounded"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <p key={image.label}>이미지 없음</p>
          )
        )}
      </div>
    </li>
  );
};
