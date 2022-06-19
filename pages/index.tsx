import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { initFavorites, useFav } from '../context/FavContext';
import { fetchFavorites } from '../context/FavContext';
import { Favorites, PlaylistData, Props } from '../helpers/types';
import TrackItem from '../components/TrackItem';
import { fetchPlaylist } from '../helpers/fetchPlaylist';
import { usePlay } from '../context/PlayContext';
import { TrackList } from '../components/TrackList';
import PlaylistHeader from '../components/PlaylistHeader';


const Home: NextPage<Props> = (props) => {

  const { initQueue } = usePlay()
  const { fav, setFav } = useFav()

  useEffect(() => {
    var favorites: Favorites = fetchFavorites(props.playlist)
    setFav(favorites)

    initQueue(props.playlist.tracks.map((e) => e.track))
  }, [])


  return (
    <div>
      <PlaylistHeader playlist={props.playlist} />
      <TrackList>
        {
          props.playlist.tracks.map((playlistTrack, i) => {
            return (
              <TrackItem
                key={playlistTrack.track.id}
                track={playlistTrack.track}
                added_at={playlistTrack.added_at}
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

export async function getStaticProps() {
  var playlistData: PlaylistData = await fetchPlaylist()

  return {
    props: {
      playlist: playlistData,
      favorites: {},
    }
  }
}

export default Home
