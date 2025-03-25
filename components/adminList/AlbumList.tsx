"use client";

import { useState } from "react";
import { Album } from "@/common/Type/type";
import { AlbumItem } from "./AlbumItem";

const AlbumList = ({ albums }: { albums: Album[] }) => {
  const [visibleCount, setVisibleCount] = useState(9);

  const loadMore = () => setVisibleCount((prev) => prev + 9);

  return (
    <div>
      {/* AlbumItem을 불러와 map 돌림 */}
      <ul className="grid gap-4 lg:grid-cols-3">
        {albums.slice(0, visibleCount).map((album) => (
          <AlbumItem key={album.id} album={album} />
        ))}
      </ul>
      {/* 클릭하면 9개씩 더 보임 */}
      {visibleCount < albums.length && (
        <button
          onClick={loadMore}
          className="p-2 mt-4 text-white bg-blue-500 rounded"
        >
          더보기
        </button>
      )}
    </div>
  );
};

export default AlbumList;
