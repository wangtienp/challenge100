// fetch 151 pokemons from Kanto region
let limit = 151
let offset = 0
let pokemonDisplayArr = []
let pokemonContainer = document.querySelector(".pokemon-container")
// import fetch function and endpoint of the API
import { endpoint, fetchPokemon } from "./http.js"


async function display() {
    // get the name and url of each pokemon
    pokemonDisplayArr = await fetchPokemon(`${endpoint}/pokemon?limit=${limit}&offset=${offset}`)
    // console.log(pokemonDisplayArr)
    // 2. Map all URLs into a list of "pending" promises (don't await yet!)
    const pokemonPromises = pokemonDisplayArr.results.map(p => fetchPokemon(p.url));

    // 3. Fetch EVERYTHING at once (parallel processing)
    const allData = await Promise.all(pokemonPromises);
    const speciesPromises = allData.map(data=>fetchPokemon(data.species.url))

    const allSpecies = await Promise.all(speciesPromises)
    // 4. Build the HTML in memory (faster than updating DOM 20+ times)
    const fragment = document.createDocumentFragment();
    allData.forEach((data,index) => {
        let id = data.id
        let names = allSpecies[index].names
        let name = names.map(name=>{
            if(name.language.name == "en"){
                return name.name
            }
        }).join("")
        let types = data.types
        let sprite = data.sprites.other["official-artwork"].front_default
        let pokemon = document.createElement("div")
        pokemon.className = "pokemon"
        pokemon.innerHTML =
            `   <a href="./detail.html?id=${id}">
            <div class="pokemon-ic" title ="${name}" >
                    <img src="${sprite}" alt="${name}" class="img">
                    <div class="desc">
                        <div class="id">#${id.toString().padStart(4, "0")}</div>
                        <div class="name">${name}</div>
                        <div class="types">
                        ${types.map(type => {
                return `<div class ="type ${type.type.name}"> ${type.type.name[0].toUpperCase() + type.type.name.substring(1)}</div>`
            }).join("")}
                        </div>
                    </div>
                </div>
            </div>
            </a>
        `
        fragment.appendChild(pokemon)
    })
    // if (i == 0) {
    //     console.log(data)
    // }

    pokemonContainer.append(fragment)
}

display()

