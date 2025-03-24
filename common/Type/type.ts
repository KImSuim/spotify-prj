export type Album = {
  id: number;
  albumsName: string;
  artistName: string;
  genres: string[];
  popularity: number;
  followers: number;
  artistsImageUrl: string;
  albumImageUrl: string;
  releaseDate: string;
  trackName: string;
  trackDuration: string;
};

export type AlbumStoreState = {
  albumName: string;
  artistName: string;
  genres: string[];
  popularity: number;
  followers: number;
  artistsImageUrl: string;
  albumImageUrl: string;
  releaseDate: string;
  trackName: string;
  trackDuration: string;
  albums: Album[];
  nextId: number;
};

export type SubHeaderProps = {
  image: string;
  name: string;
};

export type ArtistProps = {
  image: string;
  name: string;
};

export type ArtistDescriptionProps = {
  popularity: number;
  follower: number;
  genre: string[];
};

export type AlbumProps = {
  image: string;
  name: string;
};

export type SongProps = {
  name: string;
  image?: string;
  duration: string;
  number: number;
};

export type DetailProps = {
  params: { artistName: string };
};

export type TrackProps = {
  params: { trackName: string };
};
