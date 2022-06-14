import { Router, useRouter } from "next/router"
import { useEffect } from "react"
import { useFav } from "../context/FavContext"
import styles from "../styles/SideBar.module.css"
import Shotgun from "./Utils/Shotgun"
import Image from 'next/image'
import LikeButton from "./Utils/LikeButton"
import FavIconSvg from "./Utils/FavIconSvg"
import PlaylistIcon from "./Utils/PlaylistIcon"



const PlaylistElement = ({ playlist }: any) => {
    const router = useRouter()

    return (
        <div className={styles.playlistItem}>
            <div className={styles.playlistImage}
                onClick={() => router.push(playlist.link)}
            >
                <Image
                    src="/mainPlaylist.png"
                    width="100%"
                    height="100%"
                    layout="responsive"
                />
                {/* <FavIconSvg /> */}
            </div>
            <div className={styles.playlistName}>
                {playlist.name}
            </div>
            {/* {playlist.link} */}
        </div>)
}

const FavIcon = () => {
    const router = useRouter()
    const { favNumber } = useFav()

    return (
        <div className={styles.playlistItem}>
            <div className={styles.favIcon}
                onClick={() => router.push("/favorites")}
            >
                <div className={styles.favIconSquare}>
                    <div className={styles.playlistImage}>
                        <Image
                            src="/likedSongs.png"
                            width="100%"
                            height="100%"
                            layout="responsive"
                        />
                        <div className={styles.likeNumber}>
                            {favNumber}
                        </div>
                        {/* <FavIconSvg /> */}
                    </div>
                </div>
            </div>
            <div className={styles.playlistName}>
                Likes songs
            </div>
        </div>
    )
}


const PlaylistMap = () => {
    const playlistMap = [
        // {
        //     name: 'Likes songs',
        //     'link': '/favorites',
        //     image: '/likesIconEmpty.png'
        // },
        {
            name: 'Top (unsorted)',
            'link': '/',
            image: '/mainPlaylist.png'
        },
    ]

    return (
        <div className={styles.playlistMap}>
            {playlistMap.map((e) => {
                return (
                    <PlaylistElement playlist={e} key={e.link} />
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
            <FavIcon />
        </div>
    )
}

export default SideBar