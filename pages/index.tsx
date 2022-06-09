import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { usePlay } from "../context/PlayContext"
import PlayerFooter from '../components/PlayerFooter';

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
  trackIndex: number;
  playlistTrack: PlaylistTrack;
}

interface Props {
  url: string;
  tracks: Array<PlaylistTrack>;
}

const TrackItem = ({ trackIndex, playlistTrack }: TrackItemProps) => {
  const { song, setSong, play, setPlay } = usePlay()

  const [isCurrentSong, setIsCurrentSong] = useState<boolean>(false)

  useEffect(() => {
    if (song === playlistTrack.track) {
      setIsCurrentSong(true)
    }
    else {
      setIsCurrentSong(false)
    }
  }, [song])


  return (
    <div className={styles.trackItemWrapper}>
      {playlistTrack.track.preview_url != null &&
        <button onClick={() => {
          if (isCurrentSong) {
            setPlay(!play)
          }
          else {
            setSong(playlistTrack.track)
          }
        }}>
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
    </div>
  )

}


const Home: NextPage<Props> = (props) => {
  return (
    <div className={styles.App}>
      <PlayerFooter
      />
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
            trackIndex={index}
            playlistTrack={playlistTrack} />
        )
      }
      )}
    </div>
  )
}

export async function getServerSideProps() {
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

  return {
    props: {
      url: data.playlist.images[0].url,
      tracks: data.playlist.tracks,
    }
  }
}

export default Home
