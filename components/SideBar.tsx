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
                <PlaylistIcon />
                {/* <Image
                    src={playlist.image}
                    width="56px"
                    height="56px"
                    layout="fixed"
                /> */}
            </div>
            <div className={styles.playlistName}>
                {playlist.name}
            </div>
            {/* {playlist.link} */}
        </div>)
}

const FavIcon = () => {
    const { favNumber } = useFav()

    return (
        <div className={styles.favIcon}>
            <div className={styles.playlistImage}>
                <FavIconSvg />
            </div>
            <div className={styles.likeNumber}>
                {favNumber}
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
            <FavIcon />
            <PlaylistMap />
        </div>
    )
}

export default SideBar