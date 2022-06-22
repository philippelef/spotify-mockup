
import { NextPage } from "next"
import { useEffect, useState } from "react"
import PlaylistHeader from "../components/PlaylistHeader"
import TrackItem from "../components/TrackItem"
import { TrackList } from '../components/TrackList';
import { fetchFavorites, useFav } from "../context/FavContext"
import { Favorites } from "../helpers/types";
import { usePlay } from "../context/PlayContext"
import { fetchPlaylist } from "../helpers/fetchPlaylist"
import { PlaylistData, PlaylistTrack, Props } from "../helpers/types"
import styles from "../styles/TrackItem.module.css"

type FavWrapperProps = {
    playlistTrack: PlaylistTrack,
    index: number,
}

// This component is essential to put an animation when you unlike a song
// otherwise it gets instantly unmounted and you can't do anything
const FavWrapper = ({ playlistTrack, index }: FavWrapperProps) => {
    const { fav, isFav } = useFav()
    const [startRemove, setStartRemove] = useState<boolean>(false)
    const [endRemove, setEndRemove] = useState<boolean>(false)

    useEffect(() => {
        if (fav.favlist[playlistTrack.track.id]?.isFav == false) {
            setStartRemove(true)
        }
    }, [fav.favlist[playlistTrack.track.id]?.isFav])

    if (endRemove) {
        return (<></>)
    }

    return (
        <div className={`${startRemove && styles.RemoveAnim}`}
            onAnimationEnd={() => setEndRemove(true)}>
            <TrackItem
                track={playlistTrack.track}
                index={fav.favlist[playlistTrack.track.id]?.index}
                added_at={playlistTrack.added_at}
            />
        </div>
    )
}


const Favorites: NextPage<Props> = (props) => {
    const [favi, setFavi] = useState<PlaylistData>({ name: 'Liked Songs', images: [{ url: '/no_image.png' }], tracks: [] })

    const { fav, setFav } = useFav()
    const { initQueue } = usePlay()

    useEffect(() => {
        var favorites: Favorites = fetchFavorites(props.playlist)
        const tmp = Object.values(favorites.favlist).filter((e) => e.isFav).map((e) => e.index)
        console.log({ tmp })
        setFav(favorites)

        var likedTracks: PlaylistTrack[] = props.playlist.tracks.filter((e) => favorites.favlist[e.track.id].isFav == true)
        var newPlaylist: PlaylistData = { name: 'Liked Songs', images: [{ url: '/likedSongs.png' }], tracks: likedTracks }
        setFavi(newPlaylist)

        initQueue(newPlaylist.tracks.map((e) => e.track))
    }, [])

    return (
        <div>
            <PlaylistHeader playlist={favi} />
            <TrackList>
                {favi.tracks.length === 0 &&
                    <div className={styles.noSongsYet}>
                        Wow. this is empty.
                    </div>
                }
                {
                    favi.tracks.map((playlistTrack, i) => {
                        console.log({ playlistTrack, i })
                        return <FavWrapper
                            key={playlistTrack.track.id}
                            playlistTrack={playlistTrack}
                            index={i}
                        />
                    }
                    )
                }
            </TrackList>

        </div>
    )
}

export async function getStaticProps() {
    var playlistData: PlaylistData = await fetchPlaylist()

    return {
        props: {
            playlist: playlistData,
            favorites: {}
        }
    }
}

export default Favorites
