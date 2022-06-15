import { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react'
import nookies from 'nookies'
import { Favorites, PlaylistData, Track } from '../helpers/types';

type favContextType = {
    fav: Favorites;
    addFav: (track: Track) => void;
    removeFav: (track: Track, index: number) => void;
    isFav: (track: Track) => boolean;
    setFav: (favorites: Favorites, change?: boolean) => void;
    favNumber: number;
    lastDeleted: number;
    setLastDeleted: (index: number) => void
};

const favContextDefaultValues: favContextType = {
    fav: { favlist: { '0': false }, totalLength: 0 },
    addFav: () => { },
    removeFav: () => { },
    isFav: () => false,
    setFav: () => { },
    favNumber: 0,
    lastDeleted: 0,
    setLastDeleted: () => { },
};

const FavContext = createContext<favContextType>(favContextDefaultValues);

export function useFav() {
    return useContext(FavContext);
}

type Props = {
    children: ReactNode;
};

export function initFavorites(playlist: PlaylistData): Favorites {
    // var favList = tracks.map((e) => { e.id: false })
    var favorites: Favorites = { favlist: {}, totalLength: 0 }
    playlist.tracks.map((e) => favorites.favlist[e.track.id] = false)
    writeFavorites(favorites)
    return favorites
}

export function fetchFavorites(context: any, playlist: PlaylistData): Favorites {
    try {
        var favorites: Favorites = JSON.parse(nookies.get(context).favorites)
        return favorites
    }
    catch (e) {
    }

    return initFavorites(playlist)
}

export function writeFavorites(favorites: Favorites) {
    try {
        nookies.set(null, "favorites", JSON.stringify(favorites), { path: "/" })
    }
    catch (e) {
        console.error("Can't write fav")
    }
}





export function FavProvider({ children }: Props) {
    const [fav, handleFav] = useState<Favorites>({ favlist: {}, totalLength: 0 });
    const [favNumber, handleFavNumber] = useState<number>(0)
    const [lastDeleted, handleLastDeleted] = useState<number>(0)

    const setFav = (favorites: Favorites, change?: boolean) => {
        writeFavorites(favorites)
        handleFav(favorites)

        // If change argument is provided, we add or remove a fav
        // if no change argument is provided, this means this is an init, and we neeed to recalculate favNumber
        if (change != null) {
            const newNumber: number = change == true ? favNumber + 1 : favNumber - 1;
            handleFavNumber(newNumber)
        }
        else {
            handleFavNumber(getFavNumber(favorites))
        }
    }

    const getFavNumber = (favorites: Favorites): number => {
        var favNumber = 0;
        for (var [key, value] of Object.entries(favorites.favlist)) { value == true && favNumber++ }
        return favNumber
    }

    const addFav = (track: Track) => {
        if (isFav(track)) {
            console.error('Cannot Add Fav Twice')
            return false
        }
        fav.favlist[track.id] = true;
        fav.totalLength += track.duration_ms
        setFav(fav, true)
        return true
    }

    const removeFav = (track: Track) => {
        if (!isFav(track)) {
            console.error('Cannot remove fav that is not already fav')
            return false
        }
        fav.favlist[track.id] = false;
        fav.totalLength -= track.duration_ms
        setFav(fav, false)
        return true
    }

    const setLastDeleted = (index: number) => {
        handleLastDeleted(-1)
        handleLastDeleted(index)
    }

    const isFav = (track: Track): boolean => {
        return fav.favlist[track.id] == true
    }

    const value = {
        fav, addFav, removeFav, isFav, setFav, handleFav, favNumber, lastDeleted, setLastDeleted
    }

    return (
        <FavContext.Provider value={value}>
            {children}
        </FavContext.Provider>
    );
}