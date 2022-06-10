import { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react'
import { Track } from '../helpers/types';

const initialSong: Track = {
    name: '',
    id: '',
    preview_url: ''
}


const initialVolume: number = 0.5
const initialMuted = initialVolume == 0 ? true : false

type playContextType = {
    play: boolean;
    setPlay: (newState: boolean) => void;
    playRequest: boolean;
    setPlayRequest: (newState: boolean) => void;
    volume: number;
    setVolume: (newVolume: number) => void;
    muted: boolean,
    setMuted: (newState: boolean) => void;
    song: Track;
    setSong: (newSong: Track, playInstant?: boolean) => void;
};

const playContextDefaultValues: playContextType = {
    play: false,
    setPlay: () => { },
    playRequest: false,
    setPlayRequest: () => { },
    volume: initialVolume,
    setVolume: () => { },
    muted: initialMuted,
    setMuted: () => { },
    song: initialSong,
    setSong: () => { },
};

const PlayContext = createContext<playContextType>(playContextDefaultValues);

export function usePlay() {
    return useContext(PlayContext);
}

type Props = {
    children: ReactNode;
};


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

    const [playRequest, handlePlayRequest] = useState<boolean>(false)

    const setPlayRequest = (newState: boolean) => {
        handlePlayRequest(newState)
    }


    const [song, handleSong] = useState<Track>(initialSong);
    const setSong = (newSong: Track, playInstant: boolean = false) => {
        handleSong(newSong);
        refPlayer.current.load()
        if (playInstant) {
            playSong()
        }
    }

    const value = {
        play, setPlay,
        playRequest, setPlayRequest,
        volume, setVolume,
        muted, setMuted,
        song, setSong,
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

    return (
        <PlayContext.Provider value={value}>
            <audio
                // onCanPlay={() => console.log("Can Play")}
                ref={refPlayer}
                onEnded={() => setPlay(false)}
            >
                <source
                    src={song.preview_url}
                />
            </audio >
            {children}
        </PlayContext.Provider>
    );
}