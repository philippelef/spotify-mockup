import { useEffect, useState } from "react"
import ReactDOM, { unmountComponentAtNode } from "react-dom"
import { useFav } from "../context/FavContext"
import { usePlay } from "../context/PlayContext"
import { TrackItemProps } from "../helpers/types"
import Image from 'next/image'
import styles from "../styles/TrackItem.module.css"
import PlayButton from "./Buttons/PlayButton"
import PauseButton from "./Buttons/PauseButton"
import LikeButton from "./Buttons/LikeButton"

const Index = ({ unavailable, isCurrentSong, play, hover, index }: any) => {
    const color = 'white'
    if (unavailable) {
        return (<div />)
    }

    if (!hover) {
        return (
            <div className={styles.indexNumber}>
                {index + 1}
            </div>
        )
    }

    return isCurrentSong && play ? <PauseButton color={color} /> : <PlayButton color={color} />
}


function date_parse(date: string): string {
    const [newDate] = new Date(date).toISOString().split('T')
    return newDate
}

function duration_parse(duration_ms: number): string {
    const totalSeconds: number = Math.floor(duration_ms / 1000)
    const minutes: number = Math.floor(totalSeconds / 60)
    const remainingSeconds: string = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${remainingSeconds}`
}


const TrackItem = ({ track, index, favValue, added_at }: any) => {
    const dateAdded: string = date_parse(added_at)
    const trackDuration: string = duration_parse(track.duration_ms)

    const { song, setSong, play, setPlay } = usePlay()
    const { addFav, removeFav, fav, isFav } = useFav()
    const [hover, setHover] = useState<boolean>(false)

    const unavailable: boolean = track.preview_url == null

    const [isCurrentSong, setIsCurrentSong] = useState<boolean>(song === track)
    const [liked, setLiked] = useState<boolean>(favValue)

    useEffect(() => {
        setIsCurrentSong(song.id == track.id)
    }, [song])

    const PlayButtonBehavior = () => {
        if (!unavailable) {
            isCurrentSong ? setPlay(!play) : setSong(track, true)
        }
    }

    const LikeBehavior = () => {
        liked ? removeFav(track) : addFav(track)
        setLiked(!liked)
    }



    return (
        <div className={styles.trackItemStyling}>
            <div className={`${styles.trackItemWrapper} 
            ${isCurrentSong ? styles.trackItemWrapperCurrent : ''} 
            ${unavailable && styles.trackUnavailable}
            ${hover && styles.trackHover}`}
                onDoubleClick={() => PlayButtonBehavior()}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className={styles.index}
                    onClick={() => PlayButtonBehavior()}>
                    <Index unavailable={unavailable} isCurrentSong={isCurrentSong} play={play} hover={hover} index={index} />
                </div>

                <div className={styles.trackNameArtistImage}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={track.album.images ? track.album.images[0].url : '/no_image.png'}
                            layout='fixed'
                            height="40px"
                            width="40px"
                            alt='Playlist Image'
                        />
                    </div>
                    <div className={styles.trackInfo}>
                        <div className={styles.trackTitle}>
                            {/* Lorem ipsum dosdfsdflor sit amet consectetur adipisicing elit. Dolorum voluptate harum error iste ratione nesciunt, sint natus molestiae officia vitae asperiores a doloremque ducimus, excepturi molestias quisquam voluptas tenetur aliquid necessitatibus repellat ex accusantium! Ad dolorem ratione, repellendus officia consequuntur, aliquid quod saepe necessitatibus facilis, labore reiciendis a ut in. */}
                            {track.name}
                        </div>
                        <div className={styles.trackArtist}>
                            {track.artists[0].name}
                        </div>
                    </div>

                </div>

                <div className={styles.trackAlbum}>
                    {track.album.name}
                </div>

                <div className={styles.dateAdded}>
                    {dateAdded}
                </div>

                <div className={styles.likeDuration}>
                    <div className={styles.likeButton}
                        onClick={() => LikeBehavior()}>
                        <LikeButton color={liked ? 'green' : 'grey'} />
                    </div>

                    <div className={styles.duration}>
                        {trackDuration}
                    </div>
                </div>
            </div >
        </div>
    )

}

export default TrackItem