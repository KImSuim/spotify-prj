"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import ArtistHover from "@/components/artist/ArtistHover";
import { useAlbumStore } from "@/store/albumStore";
import Link from "next/link";

// ✅ 특수문자 및 악센트 제거 + 한글 유지
const normalize = (str: string) =>
  str
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // 악센트 제거
    .replace(/[^\p{L}\p{N}]+/gu, ""); // 문자/숫자만 유지 (한글 포함)

const SearchPage = () => {
  const { albums, getAlbums } = useAlbumStore();
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get("query") || "";
  const normalizedQuery = normalize(rawQuery);

  useEffect(() => {
    getAlbums();
  }, [getAlbums]);

  const groupedByArtist = useMemo(() => {
    if (!albums.length || !normalizedQuery) return {};

    const matched = albums.filter((album) => {
      const normalizedArtist = normalize(album.artistName);
      return normalizedArtist.includes(normalizedQuery);
    });

    return matched.reduce(
      (
        acc: Record<
          string,
          { artist: (typeof albums)[0]; tracks: typeof albums }
        >,
        album
      ) => {
        if (!acc[album.artistName]) {
          acc[album.artistName] = { artist: album, tracks: [] };
        }
        acc[album.artistName].tracks.push(album);
        return acc;
      },
      {}
    );
  }, [albums, normalizedQuery]);

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for: "{rawQuery}"
      </h2>

      {albums.length === 0 ? (
        <p>데이터 불러오는 중...</p>
      ) : Object.keys(groupedByArtist).length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        Object.values(groupedByArtist).map(({ artist, tracks }) => (
          <div key={artist.artistName} className="mb-12">
            <div className="mb-6 text-center">
              <Link
                href={`/detail/${artist.artistName}`}
                key={artist.artistName}
              >
                <ArtistHover
                  image={artist.artistsImageUrl}
                  name={artist.artistName}
                />
              </Link>
            </div>
            <div className="flex flex-col text-white">
              {tracks.map((track) => (
                <div key={track.id} className="bg-opacity-10 rounded-xl p-2">
                  <div className="text-lg font-medium">{track.trackName}</div>
                  <div className="text-sm text-gray-400">
                    {track.trackDuration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchPage;
