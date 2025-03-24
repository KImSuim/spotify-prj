"use client";

import { useState } from "react";
import { AlbumItem } from "./AlbumItem";
import { Album } from "@/common/Type/type";

export const AlbumList = ({ albums }: { albums: Album[] }) => {
  const [visibleCount, setVisibleCount] = useState(9);
  const loadMore = () => setVisibleCount((prev) => prev + 9);

  return (
    <div>
      <ul className="grid gap-4 lg:grid-cols-3">
        {albums.slice(0, visibleCount).map((album) => (
          <AlbumItem key={album.id} album={album} />
        ))}
      </ul>
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
