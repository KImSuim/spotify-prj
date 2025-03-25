import { Album } from "../Type/type";

export const initialFormData = {
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

type InputFieldType = {
  key: keyof typeof initialFormData;
  label: string;
  type: "text" | "number";
};

export const inputFields: InputFieldType[] = [
  { key: "albumsName", label: "앨범 이름", type: "text" },
  { key: "releaseDate", label: "발행일", type: "text" },
  { key: "artistName", label: "아티스트", type: "text" },
  { key: "genres", label: "장르 (쉼표로 구분)", type: "text" }, // 이 부분 주의!
  { key: "albumImageUrl", label: "앨범 이미지", type: "text" },
  { key: "artistsImageUrl", label: "아티스트 이미지", type: "text" },
  { key: "popularity", label: "인기도 점수", type: "number" },
  { key: "followers", label: "팔로워 수", type: "number" },
  { key: "trackName", label: "트랙 이름(노래 제목)", type: "text" },
  { key: "trackDuration", label: "트랙(노래) 재생시간", type: "text" },
];

// 텍스트 정보 배열
// get할 때는 타입을 확실하게 지정해줘야 함 -> type 사용
export type TextInfo = {
  label: string;
  value: string | number;
};

export const getTextInfo = (album: Album): TextInfo[] => {
  return [
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
};

// 이미지 정보 배열 (앨범 / 아티스트)
export type ImageInfo = {
  src: string;
  alt: string;
  label: string;
};

export const getImageInfo = (album: Album): ImageInfo[] => {
  return [
    { src: album.albumImageUrl, alt: album.albumsName, label: "앨범 이미지" },
    {
      src: album.artistsImageUrl,
      alt: album.artistName,
      label: "아티스트 이미지",
    },
  ];
};
