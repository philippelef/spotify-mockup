
import { DEFAULT_DEPRECATION_REASON } from "graphql"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { isArrayBufferView } from "util/types"
import TrackItem from "../components/TrackItem"
import { TrackList } from '../components/TrackList';
import { fetchFavorites, useFav } from "../context/FavContext"
import { usePlay } from "../context/PlayContext"
import { fetchPlaylist } from "../helpers/fetchPlaylist"
import { PlaylistData, PlaylistTrack, Props } from "../helpers/types"
import styles from "../styles/TrackItem.module.css"

const FavWrapper = ({ playlistTrack, i }: any) => {
    const { fav } = useFav()
    const [startRemove, setStartRemove] = useState<boolean>(false)
    const [endRemove, setEndRemove] = useState<boolean>(false)

    useEffect(() => {
        if (fav[playlistTrack.track.id] == false) {
            setStartRemove(true)
        }
    }, [fav[playlistTrack.track.id]])

    if (!endRemove) {
        return (
            <div className={`${startRemove && styles.RemoveAnim}`}
                onAnimationEnd={() => setEndRemove(true)}>
                <TrackItem
                    track={playlistTrack.track}
                    index={i}
                    favValue={true}
                    added_at={playlistTrack.added_at}
                />
            </div>
        )
    }
    else {
        return (<></>)
    }
}


const Favorites: NextPage<Props> = (props) => {
    const router = useRouter()

    const { setFav } = useFav()
    const { initQueue } = usePlay()

    useEffect(() => {
        initQueue(props.playlist.tracks.map((e) => e.track))
        setFav(props.favorites)
    }, [])

    return (
        <div>
            <a onClick={() => router.push('/')}>
                -{'>'}Playlist
            </a>
            <h1>
                This is where your favorites are displayed!
            </h1>

            <TrackList>
                {
                    props.playlist.tracks.map((playlistTrack, i) => {
                        return <FavWrapper
                            key={playlistTrack.track.id}
                            playlistTrack={playlistTrack}
                            i={i}
                            added_at={playlistTrack.added_at}
                        />
                    }
                    )
                }
            </TrackList>

        </div>
    )
}

export async function getServerSideProps(context: any) {
    var playlistData: PlaylistData = await fetchPlaylist()
    var favorites = fetchFavorites(context, playlistData)

    var likedTracks: PlaylistTrack[] = playlistData.tracks.filter((e) => favorites[e.track.id] == true)
    var newPlaylist: PlaylistData = { name: playlistData.name, images: playlistData.images, tracks: likedTracks }

    return {
        props: {
            playlist: newPlaylist,
            favorites: favorites
        }
    }
}

export default Favorites
