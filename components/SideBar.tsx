import { useRouter } from "next/router"
import { useEffect } from "react"
import { useFav } from "../context/FavContext"
import styles from "../styles/SideBar.module.css"
import Shotgun from "./Utils/Shotgun"

const FavNumberIndicator = () => {
    const router = useRouter()
    const { favNumber } = useFav()

    useEffect(() => {
    }, [favNumber])

    return (
        <a onClick={() => router.push('/favorites')}>
            -{'>'}Favorites {favNumber}
        </a>
    )
}

const PlaylistElement = ({ playlist }: any) => {
    return (<div>
        {playlist.link}
    </div>)
}

const PlaylistMap = () => {
    const playlistMap = [
        {
            name: '',
            'link': '/',
            image: '/no_image.png'
        },
        {
            'link': '/favorites',
            image: '/no_image.png'
        }
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
            <FavNumberIndicator />
        </div>
    )
}

export default SideBar