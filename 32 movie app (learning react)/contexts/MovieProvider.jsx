import { createContext, useContext, useEffect, useState } from "react"

const MovieContext = createContext()
export function useMovie(){
    return useContext(MovieContext)
}

export function MovieProvider({children}){
    const [favorites,setFavorites] = useState(()=>{
        const storedFavs = localStorage.getItem("favorites")
        return storedFavs? JSON.parse(localStorage.getItem("favorites")):[]
    })

    useEffect(()=>{
        localStorage.setItem("favorites",JSON.stringify(favorites))
    },[favorites])

    function addFavorites(movie){
        setFavorites(prev=>[...prev,movie])
    }
    function removeFavorites(movieId){
        setFavorites(prev=>prev.filter(movie=>movieId!=movie.id))
    }

    function isFavorites(movieId){
        return favorites.some(movie=>movie.id == movieId)
    }

    const values={
        favorites,
        addFavorites,
        removeFavorites,
        isFavorites
    }
    return(

        <MovieContext.Provider value={values}>
            {children}
        </MovieContext.Provider>
    )
}