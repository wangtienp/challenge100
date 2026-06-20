import { useMovie } from "../contexts/MovieProvider"

export function MovieCard({ movie }) {
    const {isFavorites, addFavorites, removeFavorites} = useMovie()
    const favorite = isFavorites(movie.id)

    function onFavoriteClick(e){
        e.preventDefault()
        if(favorite)removeFavorites(movie.id)
        else addFavorites(movie)
    }

    return (
        <div className="flex flex-col gap-x-2 rounded-lg overflow-hidden">
            <div className="aspect-2/3 relative w-full">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover" />
                <div className="absolute transition-opacity opacity-0 hover:opacity-100 inset-0 bg-linear-to-b from-black/10 to-black/80">
                    <button className={`absolute top-4 right-4  bg-black/50 rounded-full cursor-pointer w-10 h-10 flex items-center justify-center transition-all hover:bg-black/80 ${favorite ? "text-red-500":"text-white"}`} onClick={onFavoriteClick}>
                        ♥
                    </button>
                </div>
            </div>
            <div className="flex py-2 px-4 flex-col gap-2 justify-center bg-zinc-700">
                <h3 className="text-white">{movie.title}</h3>
                <p className="text-zinc-400 text-sm">{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    )
}