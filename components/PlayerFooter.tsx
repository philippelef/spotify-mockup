import { useEffect, useRef, useState } from "react"
import { usePlay } from "../context/PlayContext"
import styles from "../styles/PlayerFooter.module.css"

const Volume = ({ refPlayer }: { refPlayer: any }) => {
    const [volume, setVolume] = useState(1)
    const [muted, setMuted] = useState(false)

    useEffect(() => {
        refPlayer.current.volume = volume;
        if (volume == 0) {
            setMuted(true)
            refPlayer.current.muted = true;
        }
        else {
            setMuted(false)
            refPlayer.current.muted = false;
        }
    }, [volume])

    return (
        <div style={{ width: "200px" }}>
            <input
                type="range"
                id="volume"
                name="volume"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(event) => setVolume(event.target.valueAsNumber)} />
            <a>
                {muted ? 'muted' : ''}
            </a>
        </div>
    )
}

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

    const playSong = async () => {
        try {
            await refPlayer.current.play()
            setPlay(true)
        }
        catch (e) {
            refPlayer.current.pause()
            console.log("error while trying to play song: ", e)
            setPlay(false)
        }
    }


    useEffect(() => {
        if (play === true) {
            playSong()
        }
        else {
            refPlayer.current.pause()
        }
    }, [play])

    useEffect(() => {
        refPlayer.current.load()
        // refPlayer.current.pause()
        playSong()
    }, [song])

    return (
        <div className={styles.PlayerFooterWrapper}>
            <PlayButton play={play} setPlay={setPlay} />
            {song.name}
            <Volume refPlayer={refPlayer} />
            <audio ref={refPlayer}
                onEnded={() => setPlay(false)}
            >
                <source
                    type="audio/mpeg"
                    src={song.preview_url}
                />
            </audio>
        </div >
    )
}

export default PlayerFooter