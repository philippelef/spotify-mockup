
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import TrackItem from "../components/TrackItem"
import { fetchFavorites, useFav } from "../context/FavContext"
import { usePlay } from "../context/PlayContext"
import { fetchPlaylist } from "../helpers/fetchPlaylist"
import { PlaylistData, PlaylistTrack, Props } from "../helpers/types"


const Favorites: NextPage<Props> = (props) => {
    const router = useRouter()

    const { fav, setFav } = useFav()
    const { initQueue } = usePlay()

    useEffect(() => {
        initQueue(props.favorites.favList)
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
            {fav.map((track) => {
                return (
                    <TrackItem
                        key={track.id}
                        track={track} />
                )
            }
            )}
        </div>
    )
}

export async function getServerSideProps(context: any) {

    var playlistData: PlaylistData = await fetchPlaylist()
    var favorites = fetchFavorites(context)

    return {
        props: {
            playlistData: playlistData,
            favorites: favorites

        }
    }
}

export default Favorites
