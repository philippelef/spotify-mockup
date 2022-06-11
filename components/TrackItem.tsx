import { useEffect, useState } from "react"
import ReactDOM, { unmountComponentAtNode } from "react-dom"
import { useFav } from "../context/FavContext"
import { usePlay } from "../context/PlayContext"
import { TrackItemProps } from "../helpers/types"
import styles from "../styles/TrackItem.module.css"


const TrackItem = ({ track }: TrackItemProps) => {
    const { song, setSong, play, setPlay } = usePlay()
    const { addFav, removeFav, fav, isFav } = useFav()

    const [isCurrentSong, setIsCurrentSong] = useState<boolean>(song === track)
    const [liked, setLiked] = useState<boolean>(false)

    useEffect(() => {
        setLiked(isFav(track))
    }, [fav, setLiked, isFav, track])

    useEffect(() => {
        setIsCurrentSong(song.id == track.id)
    }, [track, song])

    const PlayButtonBehavior = () => {
        isCurrentSong ? setPlay(!play) : setSong(track, true)
    }

    const LikeBehavior = () => {
        liked ? removeFav(track) : addFav(track)
        setLiked(!liked)
    }


    return (
        <div className={`${styles.trackItemWrapper} ${isCurrentSong ? styles.trackItemWrapperCurrent : ''}`}>
            {track.preview_url != null &&
                <button onClick={() => PlayButtonBehavior()}>
                    <a>
                        {isCurrentSong && play ? 'pause' : 'play'}
                    </a>
                </button>
            }
            {
                track.preview_url == null &&
                <a>No Play !</a>
            }

            <div>
                {track.name}
            </div>
            <button onClick={() => LikeBehavior()}>
                {liked ? 'Unlike' : 'Like'}
            </button>
        </div >
    )

}

export default TrackItem