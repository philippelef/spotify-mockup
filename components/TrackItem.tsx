import { useEffect, useState } from "react"
import ReactDOM, { unmountComponentAtNode } from "react-dom"
import { useFav } from "../context/FavContext"
import { usePlay } from "../context/PlayContext"
import { TrackItemProps } from "../helpers/types"
import Image from 'next/image'
import styles from "../styles/TrackItem.module.css"
import PlayButton from "./Utils/PlayButton"
import PauseButton from "./Utils/PauseButton"
import LikeButton from "./Utils/LikeButton"

const Index = ({ unavailable, isCurrentSong, play, index }: any) => {
    if (unavailable) {
        return (
            <div className={styles.indexNumberUnavailable}>
                {index + 1
                }
            </div >
        )
    }

    const color = 'white'
    return (
        <>
            <div className={styles.indexInteract}>
                {
                    isCurrentSong && play ? <PauseButton color={color} /> : <PlayButton color={color} />

                }
            </div>
            <div className={styles.indexNumber} style={{ color: isCurrentSong ? 'var(--clr-accent-100' : 'white' }}>
                {index + 1}
            </div>
        </>
    )
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


const TrackItem = ({ track, index, favValue, added_at, isMobile }: any) => {
    const dateAdded: string = date_parse(added_at)
    const trackDuration: string = duration_parse(track.duration_ms)

    const { song, setSong, play, setPlay } = usePlay()
    const { addFav, removeFav, fav, isFav } = useFav()

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
        <div className={`${styles.trackItemStyling}
        ${isMobile && styles.disable}`
        }
            onClick={() => {
                if (isMobile) { PlayButtonBehavior() }
            }}
            onDoubleClick={() => PlayButtonBehavior()}
        >

            <div className={`${styles.trackItemWrapper}  
            ${unavailable && styles.trackUnavailable}`}>
                <div className={styles.indexStyle}
                    onClick={() => PlayButtonBehavior()}>
                    <Index unavailable={unavailable} isCurrentSong={isCurrentSong} play={play} index={index} />
                </div>

                <div className={styles.trackNameArtistImage}>
                    <div className={styles.imageWrapper}>
                        <div className={`${styles.playImageHover}`}
                            onClick={() => PlayButtonBehavior()}>
                            <div className={styles.mobilePlayButton}>
                                {
                                    isCurrentSong && play ? <PauseButton color={"white"} /> : <PlayButton color={"white"} />

                                }
                            </div>
                        </div>
                        <div className={styles.imageHover}>
                            <Image
                                src={track.album.images ? track.album.images[0].url : '/no_image.png'}
                                layout='fixed'
                                height="40px"
                                width="40px"
                                alt='Playlist Image'
                            />
                        </div>

                    </div>
                    <div className={styles.trackInfo}>
                        <div className={`${styles.trackTitle}
                        ${isCurrentSong ? styles.currentTrack : ''}`}
                        >
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

                    <div className={`${!liked && styles.likeVisibilityWrapper}`}>
                        <div className={styles.likeButton}
                            onClick={() => LikeBehavior()}>
                            <LikeButton liked={liked} />
                        </div>
                    </div>
                    <div className={styles.duration}>
                        {trackDuration}
                    </div>
                </div>

            </div>
        </div >
    )

}

export default TrackItem