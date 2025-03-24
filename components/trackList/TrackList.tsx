"use client";

import SongList from "../playList/SongList";
import SubHeader from "../header/SubHeader";
import { useAlbumStore } from "@/store/albumStore";

const TrackList = ({ trackName }: { trackName: string }) => {
  const { albums } = useAlbumStore();
  const cleanedTrackName = decodeURIComponent(trackName).toLowerCase();

  // 해당 trackName을 가진 앨범들
  const albumTracks = albums.filter(
    (album) =>
      decodeURIComponent(album.albumsName).toLowerCase() === cleanedTrackName
  );

  // 해당 트랙이 포함된 앨범 이름
  const currentAlbumName = albumTracks[0]?.albumsName;

  // 해당 앨범 이름으로 고유 앨범 하나 찾기
  const albumInfo = albums.find(
    (album) => album.albumsName === currentAlbumName
  );

  if (albumTracks.length === 0 || !albumInfo) {
    return <div>해당 트랙을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <SubHeader name={albumInfo.albumsName} image={albumInfo.albumImageUrl} />
      {albumTracks.map((v, i) => (
        <SongList
          key={i}
          number={i}
          image={v.albumImageUrl || ""}
          name={v.trackName}
          duration={v.trackDuration}
        />
      ))}
    </div>
  );
};

export default TrackList;
