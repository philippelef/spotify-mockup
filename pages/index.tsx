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


const Home: NextPage<Props> = (props) => {
  const router = useRouter()

  // Writing the favs
  const { setFav, fav } = useFav()
  const { initQueue } = usePlay()
  useEffect(() => {
    initQueue(props.playlist.tracks.map((e) => e.track))
    setFav(props.favorites)
  }, [])


  return (
    <div className={styles.HomePage}>
      <a onClick={() => router.push('/favorites')}>
        -{'>'}Favorites {fav.length}
      </a>
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
            <TrackItem
              key={playlistTrack.track.id}
              index={i + 1}
              track={playlistTrack.track} />
          )
        }
        )
      }
    </div >
  )
}

export async function getServerSideProps(context: any) {

  var playlistData: PlaylistData = await fetchPlaylist()
  var favorites = fetchFavorites(context)

  return {
    props: {
      playlist: playlistData,
      favorites: favorites
    }
  }
}

export default Home
