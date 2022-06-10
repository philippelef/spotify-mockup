import { useEffect, useState } from "react"
import ReactDOM, { unmountComponentAtNode } from "react-dom"
import { useFav } from "../context/FavContext"
import { usePlay } from "../context/PlayContext"
import { TrackItemProps } from "../helpers/types"
import styles from "../styles/TrackItem.module.css"

const TrackItem = ({ track }: any) => {
    const { song, setSong, play, setPlay } = usePlay()
    const { addFav, removeFav, fav, isFav } = useFav()
    const [isCurrentSong, setIsCurrentSong] = useState<boolean>(false)

    const [liked, setLiked] = useState<boolean>(false)

    useEffect(() => {
        setLiked(isFav(track))
    }, [fav])

    useEffect(() => {
        if (song !== track) {
            setIsCurrentSong(false)
        }
        else {
            setIsCurrentSong(true)
        }
    }, [song, track])

    const PlayBehaviour = () => {
        if (isCurrentSong) {
            setPlay(!play)
        }
        else {
            setSong(track, true)
        }
    }

    const LikeBehaviour = () => {
        if (liked) {
            removeFav(track)
            setLiked(false)
        }
        else {
            addFav(track)
            setLiked(true)
        }
    }


    return (
        <div className={`${styles.trackItemWrapper} ${isCurrentSong ? styles.trackItemWrapperCurrent : ''}`}>
            {track.preview_url != null &&
                <button onClick={() => PlayBehaviour()}>
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
            <button onClick={() => LikeBehaviour()}>
                {liked ? 'Unlike' : 'Like'}
            </button>
        </div >
    )

}

export default TrackItem