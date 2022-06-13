import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFav } from '../context/FavContext';
import { fetchFavorites } from '../context/FavContext';
import { PlaylistData, Props } from '../helpers/types';
import TrackItem from '../components/TrackItem';
import { fetchPlaylist } from '../helpers/fetchPlaylist';
import { usePlay } from '../context/PlayContext';
import { TrackList } from '../components/TrackList';
import PlaylistHeader from '../components/PlaylistHeader';


const Home: NextPage<Props> = (props) => {
  const { initQueue } = usePlay()
  const { setFav } = useFav()

  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    initQueue(props.playlist.tracks.map((e) => e.track))
    setFav(props.favorites)
  }, [])


  return (
    <div className={styles.HomePage} onTouchStart={() => setIsMobile(true)}>
      <PlaylistHeader playlist={props.playlist} />
      <TrackList>
        {
          props.playlist.tracks.map((playlistTrack, i) => {
            return (
              <TrackItem
                isMobile={isMobile}
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
