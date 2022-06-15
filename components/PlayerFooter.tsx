import { useEffect, useState } from "react"
import { usePlay } from "../context/PlayContext"
import { Track } from "../helpers/types"
import styles from "../styles/PlayerFooter.module.css"
import PauseButton from "./Utils/PauseButton"
import PlayButton from "./Utils/PlayButton"
import SkipButton from "./Utils/SkipButton"
import VolumeSlider from "./Utils/VolumeSlider"
import Image from 'next/image'
import VolumeIcon from "./Utils/VolumeIcon"
import VolumeMutedIcon from "./Utils/VolumeMutedIcon"

// const VolumeSlider = () => {
//     const { volume, setVolume, muted } = usePlay()

//     return (
//         <div className={styles.volumeWrapper}>
//             <input
//                 type="range"
//                 id="volume"
//                 name="volume"
//                 min={0}
//                 max={1}
//                 step={0.01}
//                 value={volume}
//                 onChange={(event) => setVolume(event.target.valueAsNumber)} />
//             <a>
//                 {muted ? 'muted' : ''}
//             </a>
//         </div >
//     )
// }

const TrackVisualizer = () => {
    const { song } = usePlay()

    if (song.id == '') {
        return (<div></div>)
    }

    return (
        <div className={styles.SongInfo}>
            <div className={styles.SongArtwork}>
                <Image
                    src={song.album.images[0].url}
                    layout='fixed'
                    height="56px"
                    width="56px"
                    alt='Song Artwork'
                />
            </div>
            <div className={styles.trackText}>
                <div className={styles.trackTitle}>
                    {song.name}
                </div>
                <div className={styles.trackArtist}>
                    {song.artists[0].name}
                </div>
            </div>

        </div >
    )
}


const Controls = () => {
    const { song, play, setPlay, skipSong, previousSong } = usePlay();
    const [noSong, setNoSong] = useState<boolean>(true)

    useEffect(() => {
        if (song.name != '') {
            setNoSong(false)
        }
    }, [song])

    return (
        <div className={`${styles.ControlsWrapper} ${noSong && styles.ControlsWrapperNoSong}`}>
            <div className={`${styles.PreviousButton} ${styles.sideButton}`}
                onClick={() => previousSong()}
            >
                <SkipButton />
            </div>
            <div className={styles.PlayButton} onClick={() => setPlay(!play)}>
                <div className={styles.RoundPlay}>
                    {play ?
                        <PauseButton color='black' /> :
                        <PlayButton color='black' />
                    }
                </div>
            </div>
            <div className={`${styles.SkipButton} ${styles.sideButton}`}
                onClick={() => skipSong()}>
                <SkipButton />
            </div>
        </div >
    )
}


const VolumeControls = () => {
    const { muted, setMuted } = usePlay()
    return (
        <>
            <div className={styles.VolumeIcon}
                onClick={() => setMuted(!muted)}
            >
                {muted ? <VolumeMutedIcon /> : <VolumeIcon />}
            </div>
            <div className={styles.VolumeSlider}>
                <VolumeSlider />
            </div>
        </>
    )
}


const PlayerFooter = () => {
    return (
        <div className={styles.PlayerFooterWrapper}>
            <TrackVisualizer />
            <Controls />
            <div className={styles.volumeWrapper}>
                <VolumeControls />
            </div>
        </div>
    )
}

export default PlayerFooter