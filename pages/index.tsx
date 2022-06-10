import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { usePlay } from "../context/PlayContext"
import { useRouter } from 'next/router';
import { useFav, writeFavorites } from '../context/FavContext';
import { fetchFavorites } from '../context/FavContext';


export type Track = {
  name: string;
  id: string;
  preview_url: string;
}

type PlaylistTrack = {
  track: Track;
  added_at: string;
}

interface TrackItemProps {
  playlistTrack: PlaylistTrack;
  initLike: boolean;
}

interface Props {
  url: string;
  tracks: Array<PlaylistTrack>;
  favorites: { favList: string[] }
}

const TrackItem = ({ playlistTrack, initLike }: TrackItemProps) => {
  const { song, setSong, play, setPlay } = usePlay()
  const { addFav, removeFav, isFav } = useFav()
  const [isCurrentSong, setIsCurrentSong] = useState<boolean>(false)

  const [liked, setLiked] = useState<boolean>(initLike)

  useEffect(() => {
    if (song !== playlistTrack.track) {
      setIsCurrentSong(false)
    }
    else {
      setIsCurrentSong(true)
    }
  }, [song, playlistTrack])

  const PlayBehaviour = () => {
    if (isCurrentSong) {
      setPlay(!play)
    }
    else {
      setSong(playlistTrack.track, true)
    }
  }

  const LikeBehaviour = () => {
    if (liked) {
      removeFav(playlistTrack.track.id)
      setLiked(false)
    }
    else {
      addFav(playlistTrack.track.id)
      setLiked(true)
    }
  }


  return (
    <div className={`${styles.trackItemWrapper} ${isCurrentSong ? styles.trackItemWrapperCurrent : ''}`}>
      {playlistTrack.track.preview_url != null &&
        <button onClick={() => PlayBehaviour()}>
          <a>
            {isCurrentSong && play ? 'pause' : 'play'}
          </a>
        </button>
      }
      {
        playlistTrack.track.preview_url == null &&
        <a>No Play !</a>
      }

      <div>
        {playlistTrack.track.name} - {playlistTrack.added_at}
      </div>
      <button onClick={() => LikeBehaviour()}>
        {liked ? 'Unlike' : 'Like'}
      </button>
    </div >
  )

}



const Home: NextPage<Props> = (props) => {
  const router = useRouter()

  const { setFav, isFav } = useFav()
  useEffect(() => {
    writeFavorites(props.favorites)
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
      {/* {JSON.stringify(props.tracks)} */}

      {props.tracks.map((playlistTrack, index) => {
        return (
          <TrackItem
            key={playlistTrack.track.id}
            initLike={props.favorites.favList.indexOf(playlistTrack.track.id) != -1}
            playlistTrack={playlistTrack} />
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
