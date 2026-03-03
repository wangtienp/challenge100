const endpoint = 'https://pokeapi.co/api/v2/'

async function fetchPokemon(url) {
    try {
        let response = await fetch(url)
        if (!response.ok) {
            throw new Error("http issue: " + response.status)
        }
        let data = await response.json()

        return data
    } catch (error) {
        console.error(error)
    }
}

export{endpoint,fetchPokemon}