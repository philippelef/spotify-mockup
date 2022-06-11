import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFav } from '../context/FavContext';
import { fetchFavorites } from '../context/FavContext';
import { Props } from '../helpers/types';
import TrackItem from '../components/TrackItem';
import { fetchPlaylist } from '../helpers/playlistFetch';
import { usePlay } from '../context/PlayContext';


const Home: NextPage<Props> = (props) => {
  const router = useRouter()

  // Writing the favs
  const { setFav, fav } = useFav()
  const { initQueue } = usePlay()
  useEffect(() => {
    initQueue(props.tracks.map((e) => e.track))
    setFav(props.favorites)
  }, [])

  // useEffect(() => {

  // }, [])

  return (
    <div>
      <a onClick={() => router.push('/favorites')}>
        -{'>'}Favorites {fav.length}
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
            key={playlistTrack.track.id}
            track={playlistTrack.track} />
        )
      }
      )}
    </div>
  )
}

export async function getServerSideProps(context: any) {

  var data = await fetchPlaylist()
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
