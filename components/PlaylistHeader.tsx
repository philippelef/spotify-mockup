import Image from 'next/image'
import { useEffect } from 'react'
import { useFav } from '../context/FavContext'
import { getPlaylistDuration } from '../helpers/getPlaylistDuration'
import { PlaylistData } from '../helpers/types'
import styles from "../styles/PlaylistHeader.module.css"


const PlaylistHeader = ({ playlist }: { playlist: PlaylistData }) => {
    const { fav, favNumber } = useFav()

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
                        {playlist.name == 'Liked Songs' ?
                            `${favNumber} songs` :
                            `${playlist.tracks.length} songs`}

                    </a>
                    {` • `}
                    <a>
                        {
                            playlist.name == 'Liked Songs' ?
                                `${Math.floor(fav.totalLength / 60000)} min` :
                                getPlaylistDuration(playlist)
                        }
                    </a>
                </div>

            </div>
        </div >
    )
}

export default PlaylistHeader