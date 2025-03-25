"use client";

import Image from "next/image";
import { Album } from "@/common/Type/type";
import {
  getImageInfo,
  getTextInfo,
  ImageInfo,
  TextInfo,
} from "@/common/parameter/parameters";

export const AlbumItem = ({ album }: { album: Album }) => {
  const textInfo: TextInfo[] = getTextInfo(album);
  const imageInfo: ImageInfo[] = getImageInfo(album);

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
