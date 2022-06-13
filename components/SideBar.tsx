import { Router, useRouter } from "next/router"
import { useEffect } from "react"
import { useFav } from "../context/FavContext"
import styles from "../styles/SideBar.module.css"
import Shotgun from "./Utils/Shotgun"
import Image from 'next/image'



const PlaylistElement = ({ playlist }: any) => {
    const router = useRouter()
    const { favNumber } = useFav()
    return (
        <div className={styles.playlistItem}>
            <div className={styles.playlistImage}
                onClick={() => router.push(playlist.link)}
            >{
                    playlist.link === '/favorites' &&
                    <div className={styles.likeNumber}>
                        {favNumber}
                    </div>
                }

                <Image
                    src={playlist.image}
                    width="56px"
                    height="56px"
                    layout="fixed"
                />
            </div>
            {/* {playlist.link} */}
        </div>)
}

const PlaylistMap = () => {
    const playlistMap = [
        {
            'link': '/favorites',
            image: '/likedSongs.png'
        },
        {
            name: '',
            'link': '/',
            image: '/mainPlaylist.png'
        },
    ]

    return (
        <div className={styles.playlistMap}>
            {playlistMap.map((e) => {
                return (
                    <PlaylistElement playlist={e} />
                )
            })}
        </div>
    )
}

const SideBar = () => {
    return (
        <div className={styles.sideBarMain}>
            <Shotgun />
            <PlaylistMap />
        </div>
    )
}

export default SideBar