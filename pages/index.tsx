import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFav } from '../context/FavContext';
import { fetchFavorites } from '../context/FavContext';
import { PlaylistData, Props } from '../helpers/types';
import TrackItem from '../components/TrackItem';
import { fetchPlaylist } from '../helpers/fetchPlaylist';
import { usePlay } from '../context/PlayContext';
import Favorites from './favorites';
import { TrackList } from '../components/TrackList';

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

const FirstRow = () => {
  return (
    <div>
      album
    </div>
  )
}


const Home: NextPage<Props> = (props) => {
  const { initQueue } = usePlay()
  const { setFav } = useFav()

  useEffect(() => {
    initQueue(props.playlist.tracks.map((e) => e.track))
    setFav(props.favorites)
  }, [])


  return (
    <div className={styles.HomePage}>
      <FavNumberIndicator />
      <div>
        <Image
          src={props.playlist.images[0].url}
          alt='Playlist Image'
          height="100px"
          width="100px"
        />
      </div>
      <TrackList>
        {
          props.playlist.tracks.map((playlistTrack, i) => {
            return (
              <TrackItem
                key={playlistTrack.track.id}
                track={playlistTrack.track}
                added_at={playlistTrack.added_at}
                favValue={props.favorites[playlistTrack.track.id]}
                index={i}
              />
            )
          }
          )
        }
      </TrackList>
    </div >
  )
}

export async function getServerSideProps(context: any) {
  var playlistData: PlaylistData = await fetchPlaylist()
  var favorites = fetchFavorites(context, playlistData)

  return {
    props: {
      playlist: playlistData,
      favorites: favorites
    }
  }
}

export default Home
