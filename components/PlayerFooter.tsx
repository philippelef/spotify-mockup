import { usePlay } from "../context/PlayContext"
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
    const { play, setPlay, song } = usePlay()

    return (
        <div className={styles.PlayerFooterWrapper}>

            <PlayButton play={play} setPlay={setPlay} />
            {song.name}
            <VolumeSlider />
        </div >
    )
}

export default PlayerFooter