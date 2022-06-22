import { useEffect, useState } from "react"
import { usePlay } from "../context/PlayContext"
import styles from "../styles/PlayerFooter.module.css"
import PauseButton from "./Utils/PauseButton"
import PlayButton from "./Utils/PlayButton"
import SkipButton from "./Utils/SkipButton"
import VolumeSlider from "./Utils/VolumeSlider"
import Image from 'next/image'
import VolumeIcon from "./Utils/VolumeIcon"
import VolumeMutedIcon from "./Utils/VolumeMutedIcon"
import { useIsMobile } from "../context/MobileContext"


const TrackVisualizer = () => {
    const { song } = usePlay()

    if (song.id == '') {
        return (<div></div>)
    }

    return (
        <div className={styles.SongInfo}>
            <div >
                <div className={styles.SongArtwork}>
                    <Image
                        src={song.album.images[0].url}
                        layout='responsive'
                        height="100%"
                        width="100%"
                        alt='Song Artwork'
                    />
                </div>
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
                onClick={() => !noSong && previousSong()}
            >
                <SkipButton />
            </div>
            <div className={styles.PlayButton} onClick={() => !noSong && setPlay(!play)}>
                <div className={styles.RoundPlay}>
                    {play ?
                        <PauseButton color='black' /> :
                        <PlayButton color='black' />
                    }
                </div>
            </div>
            <div className={`${styles.SkipButton} ${styles.sideButton}`}
                onClick={() => !noSong && skipSong()}>
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
    const { isMobile } = useIsMobile()
    return (
        <div className={`${styles.PlayerFooterWrapper} ${isMobile && styles.isMobile}`}>
            <TrackVisualizer />
            <Controls />
            <div className={styles.volumeWrapper}>
                <VolumeControls />
            </div>
        </div >
    )
}

export default PlayerFooter