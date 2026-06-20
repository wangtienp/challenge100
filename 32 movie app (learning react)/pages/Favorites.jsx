import { MovieCard } from "../components/MovieCard"
import { useMovie } from "../contexts/MovieProvider"

export function Favorites() {
    const { favorites } = useMovie()
    if (favorites) {
        return (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                {favorites.map(movie => {
                    console.log(movie)
                    return <MovieCard movie={movie} key={movie.id}></MovieCard>
                })}

            </div>
        )
    }
    return (
        <div className="p-4">
            <div className="text-center max-w-2xl flex flex-col gap-4 m-auto rounded-md bg-zinc-600 px-3 py-8">
                <h2 className="text-red-500 text-2xl">No Favorite Movie</h2>
                <p className="text-zinc-200 text-sm">Start adding favorite movies and they will appear here</p>
            </div>
        </div>
    )
}