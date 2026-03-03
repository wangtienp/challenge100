const urlParams = new URLSearchParams(window.location.search)
const idParam = urlParams.get("id")
import { fetchPokemon, endpoint } from "./http.js"

getDetails()


async function getDetails() {
    // let pokemonData = await fetchPokemon(`${endpoint}pokemon/${idParam}`)
    // let pokemonSpecies = await fetchPokemon(`${endpoint}pokemon-species/${idParam}`)
    let pokemonFormArr = [], pokemonFormData = [], pokemonFormAbiArr = []
    let numId = parseInt(idParam, 10);
    let prevId = numId == 1 ? 151 : numId - 1
    let nextId = numId == 151 ? 1 : numId + 1
    let pokemonPrevNext = [await fetchPokemon(`${endpoint}/pokemon?limit=1&offset=${prevId - 1}`), await fetchPokemon(`${endpoint}/pokemon?limit=1&offset=${nextId - 1}`)]
    const [pokemonData, pokemonSpecies] = await Promise.all([fetchPokemon(`${endpoint}pokemon/${idParam}`), fetchPokemon(`${endpoint}pokemon-species/${idParam}`)])
    
    // console.log(pokemonPrevNext)
    // console.log(pokemonData)
    // console.log(pokemonSpecies)
    let pokemonAbilityPromise = pokemonData.abilities.map(p => {
        return fetchPokemon(p.ability.url).then(fullData => ({
            data: fullData,
            isHidden: p["is_hidden"]
        }))
    })
    let pokemonAbilities = await Promise.all(pokemonAbilityPromise)
    // console.log(pokemonAbilities)
    // get next prev
    getFavicon(pokemonData)
    getPrevNext(idParam, pokemonPrevNext)
    // get pokemon name
    getPokemonName(pokemonData, pokemonSpecies)
    // get arr
    if (pokemonSpecies["forms_switchable"]) {
        //    pokemonFormArr = pokemonSpecies.varieties
        // get pokemon form
        getPokemonForm(pokemonSpecies.varieties)

        pokemonFormArr = pokemonSpecies.varieties
        let pokemonFormPromises = pokemonFormArr.map(form => fetchPokemon(form.pokemon.url))

        pokemonFormData = await Promise.all(pokemonFormPromises)


        for (let i = 0; i < pokemonFormData.length; i++) {
            let pokemonFormAbiPromise = pokemonFormData[i].abilities.map(p => {
                return fetchPokemon(p.ability.url).then(fullData => ({
                    data: fullData,
                    isHidden: p["is_hidden"]
                }))
            })
            let pokemonFormAbi = await Promise.all(pokemonFormAbiPromise)
            pokemonFormAbiArr.push(pokemonFormAbi)
        }

    }
    // console.log(pokemonFormAbiArr)
    // console.log(pokemonFormArr)
    // console.log(pokemonFormData)
    // get pokemon img
    getPokemonImg(pokemonData, pokemonFormData)
    // get pokemon data
    getPokemonData(pokemonData, pokemonSpecies, pokemonAbilities, pokemonFormData, pokemonFormAbiArr)
    // get pokemon stats
    getPokemonBaseStats(pokemonData, pokemonFormData)
    // changePokemonForm
    changePokemonForm()
}
function getFavicon(pokemon){
    let oldFavicon = document.querySelector("link[rel = 'icon']")
    document.head.removeChild(oldFavicon)
    let sprite = pokemon.sprites["front_default"]
    let favicon = document.createElement("link")
    favicon.rel ="icon"
    favicon.href = sprite
    favicon.type ="image/png"
    document.head.appendChild(favicon)
}

function getPrevNext(id, pokemon) {
    const prevNext = document.querySelector(".prev-next")
    const fragment = document.createDocumentFragment();
    const prev = document.createElement("a")
    const next = document.createElement("a")
    prev.className = 'prev'
    next.className = 'next'
    let numId = parseInt(id, 10);
    let prevId = numId == 1 ? 151 : numId - 1
    let nextId = numId == 151 ? 1 : numId + 1
    prev.href = `/detail.html?id=${prevId}`
    next.href = `/detail.html?id=${nextId}`
    let prevName = pokemon[0].results[0].name
    let nextName = pokemon[1].results[0].name
    let home = document.createElement("a")
    home.href = "./index.html"
    home.title = "Go Back to List"
    home.innerHTML = `<div class="home-btn">
                        Pokedex
                    </div>`
    prev.innerHTML =
        `
    <div class="page-wrapper">
        <span class="id">#${prevId.toString().padStart(4, "0")}</span>
        <span class="name mobile-hidden">${prevName[0].toUpperCase() + prevName.substring(1)}</span>
    </div>
    `
    next.innerHTML =
        `
    <div class="page-wrapper">
        <span class="id">#${nextId.toString().padStart(4, "0")}</span>
        <span class="name mobile-hidden">${nextName[0].toUpperCase() + nextName.substring(1)}</span>
    </div>
    `
    fragment.append(prev, home, next)
    prevNext.appendChild(fragment)
}

function getPokemonName(data, species) {
    let names = species.names
    let id = data.id
    const pokemonTitle = document.querySelector(".pokemon-title")
    pokemonTitle.innerHTML
        = `<span class="id">#${id.toString().padStart(4, "0")}</span><span class="name">${names.map(name => {
            if (name.language.name == "en") {
                return name.name
            }
        }).join("")}</span>`
}

function getPokemonForm(formArr) {
    let pokemonFormNameArr = changeName(formArr)
    const pokemonForm = document.querySelector(".pokemon-form")
    pokemonForm.innerHTML =
        ` <select name="form" class="form active">
                        ${pokemonFormNameArr.map((formName, index) => {
            return `<option value="${index}">${formName}</option>`
        }).join("")}
                    </select>`
}

function changeName(formArr) {
    let nameArr = []
    let name = ""
    let formName = ""
    let capitalizedName = ""
    formArr.forEach(form => {
        if (form["is_default"]) {
            name = form.pokemon.name
            capitalizedName = name[0].toUpperCase() + name.substring(1)
            nameArr.push(capitalizedName)
        }
        else if (form.pokemon.name.includes("mega-x")) {
            formName = `Mega ${capitalizedName} X`
            nameArr.push(formName)
            // console.log(formName)
        }
        else if (form.pokemon.name.includes("mega-y")) {
            formName = `Mega ${capitalizedName} Y`
            nameArr.push(formName)
            // console.log(formName)
        }
        else if (form.pokemon.name.includes("mega")) {
            formName = `Mega ${capitalizedName}`
            nameArr.push(formName)
            // console.log(formName)
        }
        else if (form.pokemon.name.includes("gmax")) {
            formName = `Gigantamax ${capitalizedName}`
            nameArr.push(formName)
        }
    })

    return nameArr
}

function getPokemonImg(pokemon, pokemonForm) {
    const pokemonImg = document.querySelector(".pokemon-img")
    if (pokemonForm.length == 0) {
        pokemonImg.innerHTML =
            `<img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" class="img active">`
    } else {
        pokemonImg.innerHTML =
            `
        ${pokemonForm.map((form, index) => {
                return `<img src="${form.sprites.other["official-artwork"].front_default}" alt="${form.name}" class="img ${index == 0 ? "active" : ""}">`
            }).join("")}
      `
    }
}

function getPokemonData(pokemon, species, abilities, pokemonForm, pokemonFormAbilities) {
    const pokemonSpecies = document.querySelector(".pokemon-species")
    pokemonSpecies.innerHTML = ""
    if (pokemonForm.length == 0) {
        let types = pokemon.types
        let weight = pokemon.weight / 10
        let height = pokemon.height / 10
        let category = species.genera[7].genus
        pokemonSpecies.innerHTML =
            `   
            <div class = "desc active">
                <table class="desc-table">
                    <tbody>
                        <tr>
                            <th>Types</th>
                            <td class="types">
                            ${types.map(type => {
                return `<span class = "type ${type.type.name}">${type.type.name[0].toUpperCase() + type.type.name.substring(1)}</span>`
            }).join("")}
                            </td>
                        </tr>
                        <tr>
                            <th>Species</th>
                            <td>${category}</td>
                        </tr>
                        <tr>
                            <th>Height</th>
                            <td>${height.toFixed(1)} m</td>
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td>${weight.toFixed(1)} kg</td>
                        </tr>
                        <tr>
                            <th class="ability">Abilities</th>
                            <td class="ability">
                            ${abilities.map(ability => {
                return `
                                <details>
                                    <summary>${ability.data.names[7].name}${ability.isHidden ? "<small>(Is Hidden)</small>" : ""}</summary>
                                    <p>${ability.data["effect_entries"].map(entries => {
                    if (entries.language.name == "en") {
                        return entries["short_effect"]
                    }
                }).join("")}</p>
                                </details>
                                `
            }).join("")}
                               
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div>
        `
    }
    else {
        let fragment = document.createDocumentFragment()
        for (let i = 0; i < pokemonForm.length; i++) {
            let desc = document.createElement('div')
            desc.className = `desc ${i==0?'active':''}`
          
            let formAbility = pokemonFormAbilities[i]

            let types = pokemonForm[i].types
            let weight = pokemonForm[i].weight / 10
            let height = pokemonForm[i].height / 10
            let category = species.genera[7].genus
            desc.innerHTML = `
            
                <table class="desc-table">
                    <tbody>
                        <tr>
                            <th>Types</th>
                            <td class="types">
                            ${types.map(type => {
                return `<span class = "type ${type.type.name}">${type.type.name[0].toUpperCase() + type.type.name.substring(1)}</span>`
            }).join("")}
                            </td>
                        </tr>
                        <tr>
                            <th>Species</th>
                            <td>${category}</td>
                        </tr>
                        <tr>
                            <th>Height</th>
                            <td>${height.toFixed(1)} m</td>
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td>${weight.toFixed(1)} kg</td>
                        </tr>
                        <tr>
                            <th class="ability">Abilities</th>
                            <td class="ability">
                            ${formAbility.map(ability => {
                return `
                                <details>
                                    <summary>${ability.data.names[7].name}${ability.isHidden ? "<small>(Is Hidden)</small>" : ""}</summary>
                                    <p>${ability.data["effect_entries"].map(entries => {
                    if (entries.language.name == "en") {
                        return entries["short_effect"]
                    }
                }).join("")}</p>
                                </details>
                                `
            }).join("")}
                               
                            </td>
                        </tr>


                    </tbody>
                </table>
            
            `
            fragment.append(desc)
        }
        pokemonSpecies.append(fragment)
    }
}

function getPokemonBaseStats(pokemon, pokemonForm) {
    const pokemonStat = document.querySelector(".pokemon-stats")
    pokemonStat.innerHTML = ""
    const dataList = pokemonForm.length == 0 ? [pokemon] : pokemonForm
    let fragment = document.createDocumentFragment()
    dataList.forEach((item ,i)=>{
        let statTable = document.createElement("table")
        statTable.className = `stat ${i===0? 'active' :''}`
        statTable.innerHTML = `
                    <tbody>
                        ${item.stats.map((stat, index) => {
                return `
                            <tr>
                                <th>${getStatName(index)}</th>
                                <td class="cell-num">${stat["base_stat"]}</td>
                                <td class="cell-chart">
                                    <div style="width: ${calculateWidth(stat["base_stat"])}%;" class="${classifyRank(stat["base_stat"])} barchart-bar"></div>
                                </td>
                            </tr>`
            }).join("")}
                        </tbody>
                        <tfoot>
                            <th>Total</th>
                            <td class="cell-num cell-total">${calculateTotal(item.stats)}</td>
                        </tfoot>
        `
        fragment.append(statTable)
    })
    pokemonStat.append(fragment)
    
}
function calculateWidth(stat) {
    let width = stat * 0.55558;
    if(width> 100) width = 100;
    return width.toFixed(2);
}

function classifyRank(stat) {
    let rank = ""
    if (stat < 30) rank = 'rank-1'
    else if (stat < 60) rank = 'rank-2'
    else if (stat < 90) rank = 'rank-3'
    else if (stat < 120) rank = 'rank-4'
    else if (stat < 150) rank = 'rank-5'
    else rank = 'rank-6'
    return rank;
}
function calculateTotal(statArr) {
    let sum = 0
    for (let i = 0; i < statArr.length; i++) {
        sum += statArr[i]["base_stat"]
    }
    return sum
}
function getStatName(index) {
    return ["HP", "Atk", "Def", "Sp. Atk", "Sp. Def", "Speed"][index];
}
function changePokemonForm() {
    const formSelector = document.querySelector("select.form")
    const images = document.querySelectorAll(".pokemon-img>.img")
    const descs = document.querySelectorAll(".pokemon-species>.desc")
    const stats = document.querySelectorAll(".pokemon-stats>.stat")
    const dataList = [images,descs,stats]
    if(formSelector == null)return
    formSelector.addEventListener("change",(e)=>{
        // console.log(e)
        let index = parseInt(e.target.value,10)
        // console.log(dataList)
        for(let i =0; i <dataList.length;i++){
            dataList[i].forEach((item,k)=>
                {
                    item.classList.remove("active")
                    if(index == k){
                        item.classList.add("active")
                    }
                })
            
        }
    })
}