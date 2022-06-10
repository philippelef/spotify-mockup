import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"

const Favorites: NextPage = () => {
    const router = useRouter()
    return (
        <div>
            <a onClick={() => router.push('/')}>
                -{'>'}Playlist
            </a>
            <h1>
                This is where your favorites are displayed!
            </h1>
        </div>
    )
}

export default Favorites