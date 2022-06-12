import { PlaylistData } from "./types";

export function getPlaylistDuration(playlist: PlaylistData): string {
    var totalDuration: number = 0;
    console.log(playlist)
    playlist.tracks.forEach((e) => totalDuration += e.track.duration_ms)

    var totalMinutes: string = String(Math.floor(totalDuration / 60000))

    return `${totalMinutes} min`
}

