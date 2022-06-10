import { ApolloClient, gql, InMemoryCache } from "@apollo/client"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import TrackItem from "../components/TrackItem"
import { fetchFavorites, useFav } from "../context/FavContext"
import { PlaylistTrack, Props, Track } from "../helpers/types"


const Favorites: NextPage<Props> = (props) => {
    const router = useRouter()

    const { fav, setFav } = useFav()

    useEffect(() => {
        setFav(props.favorites)
    }, [])

    return (
        <div>
            <a onClick={() => router.push('/')}>
                -{'>'}Playlist
            </a>
            <h1>
                This is where your favorites are displayed!
            </h1>
            {fav.map((track) => {
                return (
                    <TrackItem
                        key={track.id}
                        track={track} />
                )
            }
            )}
        </div>
    )
}

export async function getServerSideProps(context: any) {
    const client = new ApolloClient({
        uri: 'https://spotify-graphql.shotgun.live/api',
        cache: new InMemoryCache()
    });

    const { data } = await client.query({
        query: gql`
        query getUrl {
          playlist {
            name
            images {
              url
            }
            tracks {
              added_at
              track {
                id
                name
                preview_url
              }
            }
          }
        }
        `
    })

    var favorites = fetchFavorites(context)

    var tracks: PlaylistTrack[] = data.playlist.tracks
    // console.log("tracks: ", favorites.favList.indexOf(tracks[1].track) != -1)
    // tracks = tracks.filter(e => favorites.favList.indexOf(e.track) != -1)


    return {
        props: {
            url: data.playlist.images[0].url,
            tracks: tracks,
            favorites: favorites

        }
    }
}

export default Favorites