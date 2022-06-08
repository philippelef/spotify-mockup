import { useEffect, useRef } from "react"
import { usePlay } from "../context/PlayContext"
import styles from "../styles/PlayerFooter.module.css"



const PlayButton = ({ play, setPlay }: any) => {
    if (play) {
        return (
            <button onClick={
                () => {
                    setPlay(false)
                }}>
                Pause
            </button >
        )
    }
    else {
        return (
            <button onClick={
                () => {
                    setPlay(true)
                }}>
                Play
            </button>
        )
    }
}

const PlayerFooter = () => {
    const refPlayer = useRef<any>()

    const { play, setPlay, song } = usePlay()

    useEffect(() => {
        if (play) {
            refPlayer.current.play()
        }
        else {
            refPlayer.current.pause()
        }
    }, [play])

    useEffect(() => {
    }, [song])

    return (
        <div className={styles.PlayerFooterWrapper}>
            <PlayButton play={play} setPlay={setPlay} />
            {song.name}
            <audio ref={refPlayer}
                src={song.preview_url}
                autoPlay={true}
            >
            </audio>
        </div>
    )
}

export default PlayerFooter