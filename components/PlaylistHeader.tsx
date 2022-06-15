import Image from 'next/image'
import { getPlaylistDuration } from '../helpers/getPlaylistDuration'
import { PlaylistData } from '../helpers/types'
import styles from "../styles/PlaylistHeader.module.css"


const PlaylistHeader = ({ playlist }: { playlist: PlaylistData }) => {

    return (
        <div
            className={styles.playlistHeader} >
            <div className={styles.playlistImage}>
                <Image
                    src={playlist.images[0].url}
                    layout='fixed'
                    height="192px"
                    width="192px"
                    alt='Playlist Image'
                />
            </div>
            <div className={styles.playlistInfo}>
                <a className={styles.playlistType}>
                    PLAYLIST
                </a>
                <a className={styles.playlistTitle}>
                    {playlist.name}
                </a>
                <div className={styles.playlistSubtitle}>
                    <a>
                        Philippe
                    </a>
                    {` • `}
                    <a>
                        {playlist.tracks.length} songs
                    </a>
                    {` • `}
                    <a>
                        {getPlaylistDuration(playlist)}
                    </a>
                </div>

            </div>
        </div >
    )
}

export default PlaylistHeader