export type Track = {
    name: string;
    id: string;
    preview_url: string;
}

export type PlaylistTrack = {
    track: Track;
    added_at: string;
}

export interface TrackItemProps {
    track: Track;
}

export interface Props {
    url: string;
    tracks: Array<PlaylistTrack>;
    favorites: { favList: Track[] }
}