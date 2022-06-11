import { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react'
import { Track } from '../helpers/types';

const initialSong: Track = {
    name: '',
    id: '',
    preview_url: '',
    artists: [],
    album: {
        id: '',
        name: '',
        images: [],
    }
}


const initialVolume: number = 0.1
const initialMuted = initialVolume == 0 ? true : false

type playContextType = {
    play: boolean;
    setPlay: (newState: boolean) => void;
    volume: number;
    setVolume: (newVolume: number) => void;
    muted: boolean,
    setMuted: (newState: boolean) => void;
    song: Track;
    setSong: (newSong: Track, playInstant?: boolean, index?: number) => void;
    skipSong: () => void;
    previousSong: () => void;
    initQueue: (newQueue: Track[]) => void;
};

const playContextDefaultValues: playContextType = {
    play: false,
    setPlay: () => { },
    volume: initialVolume,
    setVolume: () => { },
    muted: initialMuted,
    setMuted: () => { },
    song: initialSong,
    setSong: () => { },
    skipSong: () => { },
    previousSong: () => { },
    initQueue: () => { },
};

const PlayContext = createContext<playContextType>(playContextDefaultValues);

export function usePlay() {
    return useContext(PlayContext);
}

type Props = {
    children: ReactNode;
};


function isAvailable(track: Track): boolean {
    return track.preview_url != null;
}


export function PlayProvider({ children }: Props) {
    const [play, handlePlay] = useState<boolean>(false);
    const setPlay = (newState: boolean) => {
        handlePlay(newState)
    }

    const [volume, handleVolume] = useState<number>(initialVolume)
    const setVolume = (newVolume: number) => {
        handleVolume(newVolume)
    }

    const [muted, handleMuted] = useState<boolean>(initialMuted)
    const setMuted = (newState: boolean) => {
        handleMuted(newState);
    }

    const [queue, setQueue] = useState<Track[]>([])
    const [qIndex, setQIndex] = useState<number>(0)

    const [song, handleSong] = useState<Track>(initialSong);
    const setSong = (newSong: Track, playInstant: boolean = false, index?: number) => {
        if (index == null) {
            index = queue.findIndex(elt => elt.id === newSong.id)
        }
        setQIndex(index)
        handleSong(newSong);
        refPlayer.current.load()
        if (playInstant && newSong.preview_url != null) {
            playSong()
        }
    }

    const skipSong = () => {
        // Modulo is essential for going back to the other playlist end.
        var newIndex: number = newIndex = (qIndex + 1 + queue.length) % queue.length
        // This is in case the next song is unavailable.
        while (!isAvailable(queue[newIndex])) {
            newIndex = (newIndex + 1 + queue.length) % queue.length
        }

        setSong(queue[newIndex], true, newIndex)
    }

    const previousSong = () => {
        // Modulo is essential for going back to the other playlist end.
        var newIndex: number = newIndex = (qIndex - 1 + queue.length) % queue.length
        // This is in case the previous song is unavailable.
        while (!isAvailable(queue[newIndex])) {
            newIndex = (newIndex - 1 + queue.length) % queue.length
        }

        setSong(queue[newIndex], true, newIndex)

    }

    const initQueue = (newQueue: Track[]) => {
        setQueue(newQueue)
        // If the player is initialized with a song, we need to recalculate
        // its index for the best Skip / Previous behaviour. 
        if (song.id != '') {
            var index: number = newQueue.findIndex(elt => elt.id === song.id)
            if (index === -1) {
                index = 0
            }
            setQIndex(index)
        }

    }

    const refPlayer = useRef<any>()

    const playSong = async () => {
        try {
            await refPlayer.current.play()
            setPlay(true)
        }
        catch (e) {
            refPlayer.current.pause()
            console.log("error while trying to play song: ", e)
            setPlay(false)
        }
    }

    useEffect(() => {
        if (play == true) {
            playSong()
        }
        else {
            refPlayer.current.pause()
        }
    }, [play])


    useEffect(() => {
        refPlayer.current.volume = volume;
        if (volume == 0) {
            setMuted(true)
            refPlayer.current.muted = true;
        }
        else {
            setMuted(false)
            refPlayer.current.muted = false;
        }
    }, [volume])


    const value = {
        play, setPlay,
        volume, setVolume,
        muted, setMuted,
        song, setSong,
        skipSong, previousSong, initQueue,
    }

    return (
        <PlayContext.Provider value={value}>
            <audio
                ref={refPlayer}
                onEnded={() => skipSong()}
            >
                <source
                    src={song.preview_url}
                />
            </audio >
            {children}
        </PlayContext.Provider>
    );
}