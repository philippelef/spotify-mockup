import { useEffect, useState } from "react"
import ReactDOM, { unmountComponentAtNode } from "react-dom"
import { useFav } from "../context/FavContext"
import { usePlay } from "../context/PlayContext"
import { TrackItemProps } from "../helpers/types"
import Image from 'next/image'
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
                Feb 4. 2022
            </div>

            <div className={styles.likeDuration}>
                <button onClick={() => LikeBehavior()}>
                    {liked ? 'Unlike' : 'Like'}
                </button>

                <div className={styles.duration}>
                    3:14
                </div>
            </div>


        </div >
    )

}

export default TrackItem