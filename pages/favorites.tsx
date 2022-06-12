
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { isArrayBufferView } from "util/types"
import TrackItem from "../components/TrackItem"
import { fetchFavorites, useFav } from "../context/FavContext"
import { usePlay } from "../context/PlayContext"
import { fetchPlaylist } from "../helpers/fetchPlaylist"
import { PlaylistData, PlaylistTrack, Props } from "../helpers/types"
import styles from "../styles/TrackItem.module.css"

const FavWrapper = ({ playlistTrack, i }: any) => {
    const { fav } = useFav()
    const [remove, setRemove] = useState<boolean>(false)
    const [canRemove, setCanRemove] = useState<boolean>(false)

    useEffect(() => {
        setRemove(!fav[playlistTrack.track.id])
        if (fav[playlistTrack.track.id] == false) {
            console.log("removing Track with Anim!")
        }
    }, [fav[playlistTrack.track.id]])
    if (!canRemove) {
        return (
            <div className={`${remove && styles.RemoveAnim}`}
                onAnimationEnd={() => setCanRemove(true)}>
                <TrackItem
                    track={playlistTrack.track}
                    index={i}
                />
            </div>
        )
    }
}


const Favorites: NextPage<Props> = (props) => {
    const router = useRouter()

    const { fav, setFav } = useFav()
    const { initQueue } = usePlay()

    useEffect(() => {
        console.log("fave", fav)
        initQueue(props.playlist.tracks.map((e) => e.track))
        setFav(props.favorites)
        // setFav(props.favorites)
    }, [])



    return (
        <div>
            <a onClick={() => router.push('/')}>
                -{'>'}Playlist
            </a>
            <h1>
                This is where your favorites are displayed!
            </h1>
            {
                props.playlist.tracks.map((playlistTrack, i) => {
                    return <FavWrapper key={playlistTrack.track.id} playlistTrack={playlistTrack} i={i} />
                }
                )
            }
        </div>
    )
}

export async function getServerSideProps(context: any) {
    var playlistData: PlaylistData = await fetchPlaylist(context)
    var favorites = fetchFavorites(context, playlistData)

    return {
        props: {
            playlist: playlistData,
            favorites: favorites
        }
    }
}

export default Favorites
