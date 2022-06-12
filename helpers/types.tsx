export type Artist = {
    id: string
    name: string
    images: Image[]
}

export type Album = {
    id: string,
    name: string
    images: Image[]
}

export type Track = {
    name: string
    id: string
    preview_url: string
    artists: Artist[]
    album: Album
    like: boolean
}

export type Image = {
    url: string;
}

export type PlaylistData = {
    name: string;
    images: Image[];
    tracks: PlaylistTrack[];
}

export type PlaylistTrack = {
    track: Track;
    added_at: string;
}

export interface TrackItemProps {
    index: number,
    track: Track;
}

export type Favorites = {
    [id: string]: boolean
}

export interface Props {
    playlist: PlaylistData,
    favorites: Favorites,
}