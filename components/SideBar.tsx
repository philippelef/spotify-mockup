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
import { PlaylistData } from "../helpers/types"
import path from "path"

type PlaylistElement = {
    name: string;
    link: string;
    image: string;
}


type PlaylistProps = {
    playlist: PlaylistElement;
    pathname: string;
}

const PlaylistElement = ({ playlist, pathname }: PlaylistProps) => {
    const router = useRouter()

    const isLocal = router.pathname === pathname

    return (
        <Link href='/'>
            <a className={`${styles.playlistItem} ${isLocal && styles.isCurrentPlaylist}`}>
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

const FavIcon = ({ pathname }: { pathname: string }) => {
    const router = useRouter()
    const { favNumber } = useFav()

    const isLocal = router.pathname === pathname

    return (
        <Link href='/favorites' className={styles.justifyEnd}>
            <a className={`${styles.playlistItem} ${isLocal && styles.isCurrentPlaylist}`}>
                <div className={styles.favIcon}
                >
                    <div className={styles.favIconSquare}>
                        <div className={styles.playlistImage}>
                            <FavIconSvg />
                            <div className={styles.likeNumber}>
                                {favNumber}
                            </div>
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
    const playlistMap: PlaylistElement[] = [
        {
            name: 'Top (unsorted)',
            link: '/',
            image: '/mainPlaylist.png'
        },
    ]

    return (
        <div className={styles.playlistMap}>
            {playlistMap.map((e) => {
                return (
                    <PlaylistElement playlist={e} key={e.link} pathname={"/"} />
                )
            })}
        </div>
    )
}

const SideBar = () => {
    const { isMobile } = useIsMobile()

    return (
        <div className={`${styles.sideBarMain} ${isMobile && styles.isMobile}`}>
            <Shotgun />
            <PlaylistMap />
            <FavIcon pathname="/favorites" />
        </div>
    )
}

export default SideBar