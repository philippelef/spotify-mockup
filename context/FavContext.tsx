import { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react'
import nookies from 'nookies'
import { Track } from '../helpers/types';

type favContextType = {
    fav: Track[];
    addFav: (track: Track) => void;
    removeFav: (track: Track) => void;
    isFav: (track: Track) => boolean;
    setFav: (favorites: Favorites) => void;
};

const favContextDefaultValues: favContextType = {
    fav: [],
    addFav: () => { },
    removeFav: () => { },
    isFav: () => false,
    setFav: () => { }
};

const FavContext = createContext<favContextType>(favContextDefaultValues);

export function useFav() {
    return useContext(FavContext);
}

type Props = {
    children: ReactNode;
};

type Favorites = {
    favList: Track[]
}

export function initFavorites(): Favorites {
    const favorites = { favList: [] }
    writeFavorites(favorites)
    return { favList: [] }
}

export function fetchFavorites(context: any): Favorites {
    try {
        var favorites: Favorites = JSON.parse(nookies.get(context).favorites)
        return favorites
    }
    catch (e) {
        console.error("Error while parsing localStorage favorites: ", e)
    }

    return initFavorites()
}

export function writeFavorites(favorites: Favorites) {
    try {
        nookies.set(null, "favorites", JSON.stringify(favorites), { path: "/" })
    }
    catch (e) {
        console.log("Can't write fav")
    }
}

export function FavProvider({ children }: Props) {
    const [fav, handleFav] = useState<Track[]>([]);

    const setFav = (favorites: Favorites) => {
        writeFavorites(favorites)
        handleFav([...favorites.favList])
        // handleFav(favorites.favList)
    }

    const addFav = (newTrack: Track) => {
        if (isFav(newTrack)) {
            console.error('Cannot Add Fav Twice')
            return false
        }
        try {
            var favorites: Favorites = { favList: fav }
            favorites.favList.push(newTrack)
            setFav(favorites)
            return true
        }
        catch (e) {
            console.error('Error while adding a new favorite: ', e);
            return false
        }
    }

    const removeFav = (track: Track) => {
        try {
            var newFavorites: Favorites = { favList: [...fav] }
            const index = newFavorites.favList.findIndex(elt => elt.id === track.id)
            if (index > -1) {
                newFavorites.favList.splice(index, 1)
                setFav(newFavorites)
                return true
            }
        }
        catch (e) {
            console.error('Error while deleting favorite nb ', track.id);
        }
        return false
    }

    const isFav = (track: Track): boolean => {
        return fav.some(elt => elt.id === track.id)
    }

    const value = {
        fav, addFav, removeFav, isFav, setFav, handleFav
    }

    return (
        <FavContext.Provider value={value}>
            {children}
        </FavContext.Provider>
    );
}