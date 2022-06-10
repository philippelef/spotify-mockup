type Favorites = {
    favList: string[]
}

export function initFavorites(): Favorites {
    localStorage.setItem("favorites", JSON.stringify({ favList: [] }))
    return { favList: [] }
}

export function getFavorites(): Favorites {
    var favStorage: string | null = localStorage.getItem("favorites")
    if (favStorage == null) {
        // First Website Load Ever Case: 
        return initFavorites()
    }

    try {
        return JSON.parse(favStorage)
    }
    catch (e) {
        console.error("Error while parsing localStorage favorites: ", e)
        return { favList: [] }
    }
}


export function addFavorite(id: string): boolean {
    try {
        var favorites: Favorites = getFavorites()
        var favList = favorites.favList
        favList.push(id)
        return true
    }
    catch (e) {
        console.error('Error while adding a new favorite: ', e);
        return false
    }
}

export function removeFavorite(id: string): boolean {
    try {
        var favorites: Favorites = getFavorites()
        var favList: string[] = favorites.favList
        const index = favList.indexOf(id)
        if (index > -1) {
            favList.splice(index, 1)
        }
        else {
            return false
        }
        return true

    }
    catch (e) {
        console.error('Error while deleting favorite nb ', id);
        return false
    }
}