import { createContext, useState, useContext, ReactNode } from 'react'
import { Track } from '../pages/index'

const initialSong: Track = {
    name: '',
    id: '',
    preview_url: ''
}

type playContextType = {
    play: boolean;
    setPlay: (newState: boolean) => void;
    song: Track;
    setSong: (newSong: Track) => void;
    skipSong: () => void;
};

const playContextDefaultValues: playContextType = {
    play: false,
    setPlay: () => { },
    song: initialSong,
    setSong: (newSong: Track) => { },
    skipSong: () => null,
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

    const [song, handleSong] = useState<Track>(initialSong);
    const setSong = (newSong: Track) => {
        handleSong(newSong);
    }

    const skipSong = () => {
        setSong(initialSong);
    }

    const value = {
        play,
        setPlay,
        song,
        setSong,
        skipSong,
    }

    return (
        <PlayContext.Provider value={value}>
            {children}
        </PlayContext.Provider>
    );
}