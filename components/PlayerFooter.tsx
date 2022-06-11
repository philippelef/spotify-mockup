import { useState } from "react"
import { usePlay } from "../context/PlayContext"
import { Track } from "../helpers/types"
import styles from "../styles/PlayerFooter.module.css"

const VolumeSlider = () => {
    const { volume, setVolume, muted } = usePlay()

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
    return (
        <button onClick={() => setPlay(!play)}>
            {play ? 'Pause' : 'Play'}
        </button >
    )
}

const PreviousButton = () => {
    const { previousSong } = usePlay()

    return (
        <button onClick={() => previousSong()}>
            Previous
        </button>
    )

}

const SkipButton = () => {
    const { skipSong } = usePlay()

    return (
        <button onClick={() => skipSong()}>
            Skip
        </button>
    )

}


const PlayerFooter = () => {
    const { play, setPlay, song } = usePlay()

    return (
        <div className={styles.PlayerFooterWrapper}>
            <div className={styles.ControlsWrapper}>
                <PreviousButton />
                <PlayButton play={play} setPlay={setPlay} />
                <SkipButton />
                <VolumeSlider />
            </div>
            <div className={styles.SongInfoWrapper}>
                {song.name}
            </div>
        </div >
    )
}

export default PlayerFooter