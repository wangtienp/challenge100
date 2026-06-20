const API_KEY = "492609d9d512cce6f697fc3cda0d016f"
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies =  async() =>{
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)

    if(!response.ok){
        throw new Error(`${response.statusText}`)
    }
    const data = await response.json()
    return data.results
}
export const searchMovie =  async(query) =>{
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)

    if(!response.ok){
        throw new Error(`${response.statusText}`)
    }
    const data = await response.json()
    return data.results
}