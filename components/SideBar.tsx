import { Router, useRouter } from "next/router"
import { useEffect } from "react"
import { useFav } from "../context/FavContext"
import styles from "../styles/SideBar.module.css"
import Shotgun from "./Utils/Shotgun"
import Image from 'next/image'
import LikeButton from "./Utils/LikeButton"
import FavIconSvg from "./Utils/FavIconSvg"
import PlaylistIcon from "./Utils/PlaylistIcon"
import Link from "next/link"
import { useIsMobile } from "../context/MobileContext"



const PlaylistElement = ({ playlist }: any) => {
    const router = useRouter()

    return (
        <Link href='/'>
            <a className={styles.playlistItem}>
                <div className={styles.playlistImage}
                    onClick={() => router.push(playlist.link)}
                >
                    {/* <Image
                        src="/mainPlaylist.png"
                        width="100%"
                        height="100%"
                        layout="responsive"
                    /> */}
                    <PlaylistIcon />
                </div>
                <div className={styles.playlistName}>
                    {playlist.name}
                </div>
            </a>
        </Link>
    )
}

const FavIcon = () => {
    const { favNumber } = useFav()

    return (
        <Link href='/favorites' className={styles.justifyEnd}>
            <a className={styles.playlistItem}>
                <div className={styles.favIcon}
                >
                    <div className={styles.favIconSquare}>
                        <div className={styles.playlistImage}>
                            {/* <Image
                                src="/likesWhite.png"
                                width="100%"
                                height="100%"
                                layout="responsive"
                            /> */}
                            <FavIconSvg />
                            <div className={styles.likeNumber}>
                                {favNumber}
                            </div>
                            {/* <FavIconSvg /> */}
                        </div>
                    </div>
                </div>
                <div className={styles.playlistName}>
                    Liked Songs
                </div>
            </a>
        </Link >
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
    const { isMobile } = useIsMobile()

    console.log("isMobile: ", isMobile)

    return (
        <div className={`${styles.sideBarMain} ${isMobile && styles.isMobile}`}>
            <Shotgun />
            <PlaylistMap />
            <FavIcon />
        </div>
    )
}

export default SideBar