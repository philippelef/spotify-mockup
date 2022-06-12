import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getFavNumber, useFav } from '../context/FavContext';
import { fetchFavorites } from '../context/FavContext';
import { PlaylistData, Props } from '../helpers/types';
import TrackItem from '../components/TrackItem';
import { fetchPlaylist } from '../helpers/fetchPlaylist';
import { usePlay } from '../context/PlayContext';

const FavNumberIndicator = () => {
  const router = useRouter()
  const { favNumber } = useFav()

  useEffect(() => {
    console.log("favNumber", favNumber)
  }, [favNumber])
  return (
    <a onClick={() => router.push('/favorites')}>
      -{'>'}Favorites {favNumber}
    </a>
  )
}


const Home: NextPage<Props> = (props) => {
  const { setFav, fav, favNumber } = useFav()
  const { initQueue } = usePlay()

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
      {
        props.playlist.tracks.map((playlistTrack, i) => {
          return (
            <div>
              <TrackItem
                key={playlistTrack.track.id}
                track={playlistTrack.track}
                index={i}
              />
            </div>
          )
        }
        )
      }
    </div >
  )
}

export async function getServerSideProps(context: any) {
  var playlistData: PlaylistData = await fetchPlaylist(context)
  var favorites = fetchFavorites(context, playlistData)

  return {
    props: {
      playlist: playlistData,
      favorites: favorites
    }
  }
}

export default Home
