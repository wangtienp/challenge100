import { useEffect, useState } from "react"
import { MovieCard } from "../components/MovieCard"
import { getPopularMovies, searchMovie } from "../services/api"

export function Homepage() {

    const [input, setInput] = useState("")
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies")
            } finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    async function handleSearch(e) {
        if (input.trim() == "") return
        if(loading) return
        e.preventDefault()
        setLoading(true)
        try{
            const search = await searchMovie(input)
            console.log(search)
            setMovies(search)
        }catch(err){
            console.log(err)
            setError("Failed to search movies")
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col gap-4 p-4">
            <form className="py-1.5 h-10 w-full flex justify-center items-center gap-2"
                onSubmit={handleSearch}>
                <input type="text" placeholder="Search for movies..." className="bg-zinc-700 rounded px-4 py-2 focus:shadow-[0_0_0_2px_#aaa] flex-1 max-w-[600px] outline-none text-zinc-100 border-0"
                    onChange={(e) => setInput(e.target.value)}
                    value={input} />
                <button className="bg-red-500 text-white px-3 py-2.5 text-sm rounded">Search</button>
            </form>
            {error&&<div>{error}</div>}
            {loading ? <div>Loading...</div> :
                <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                    {movies.map(movie =>
                        <MovieCard movie={movie} key={movie.id}></MovieCard>
                    )}

                </div>
            }

        </div>
    )

}