import { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react'
import nookies from 'nookies'

type favContextType = {
    fav: string[];
    addFav: (id: string) => void;
    removeFav: (id: string) => void;
    isFav: (id: string) => boolean;
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
    favList: string[]
}

export function initFavorites(): Favorites {
    // localStorage.setItem("favorites", JSON.stringify({ favList: [] }))
    const favorites = { favList: [] }
    console.log("INIT FAVORITES")
    writeFavorites(favorites)
    return { favList: [] }
}

export function fetchFavorites(context: any): Favorites {
    try {
        return JSON.parse(nookies.get(context).favorites)
    }
    catch (e) {
        console.error("Error while parsing localStorage favorites: ", e)
    }

    return initFavorites()
}

export function writeFavorites(favorites: Favorites) {
    // localStorage.setItem("favorites", JSON.stringify(favorites))
    console.log("favorites: ", favorites)
    nookies.set(null, "favorites", JSON.stringify(favorites), { path: "/" })
}

export function FavProvider({ children }: Props) {
    const [fav, handleFav] = useState<string[]>([]);

    const setFav = (favorites: Favorites) => {
        console.log("updating favs look", favorites)
        handleFav(favorites.favList)
    }

    const addFav = (id: string) => {
        try {
            console.log("Adding Fav!")
            var favorites: Favorites = { favList: fav }
            favorites.favList.push(id)
            writeFavorites(favorites)
            handleFav(favorites.favList)
            return true
        }
        catch (e) {
            console.error('Error while adding a new favorite: ', e);
            return false
        }
    }

    const removeFav = (id: string) => {
        try {
            console.log("Removing Fav!")
            var favorites: Favorites = { favList: fav }
            const index = favorites.favList.indexOf(id)
            if (index > -1) {
                favorites.favList.splice(index, 1)
                writeFavorites(favorites)
                handleFav(favorites.favList)
                return true
            }
        }
        catch (e) {
            console.error('Error while deleting favorite nb ', id);
        }
        return false
    }

    const isFav = (id: string): boolean => {
        const present: boolean = fav.indexOf(id) != -1
        return present
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