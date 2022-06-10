import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { usePlay } from "../context/PlayContext"
import { useRouter } from 'next/router';
import { useFav, writeFavorites } from '../context/FavContext';
import { fetchFavorites } from '../context/FavContext';
import { Props, TrackItemProps } from '../helpers/types';
import TrackItem from '../components/TrackItem';


const Home: NextPage<Props> = (props) => {
  const router = useRouter()

  // Writing the favs
  const { setFav, isFav, fav } = useFav()
  useEffect(() => {
    setFav(props.favorites)
  }, [])

  return (
    <div>
      <a onClick={() => router.push('/favorites')}>
        -{'>'}Favorites
      </a>
      <div>
        <Image
          src={props.url}
          alt='Playlist Image'
          height="100px"
          width="100px"
        />
      </div>
      {props.tracks.map((playlistTrack) => {
        // const trackId: string = playlistTrack.track.id
        return (
          <TrackItem
            removeItem={() => console.log("index remove click")}
            key={playlistTrack.track.id}
            track={playlistTrack.track} />
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

  return {
    props: {
      url: data.playlist.images[0].url,
      tracks: data.playlist.tracks,
      favorites: favorites
    }
  }
}

export default Home
