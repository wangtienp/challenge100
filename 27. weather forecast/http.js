const baseGeoURL = "http://api.openweathermap.org/geo/1.0/direct?q="
const key = 'f9f8a5767c30fc3b5e28758a2d7227eb'
const limit = 5

export async function getLonLat(q){
    if(q.trim() == "")return []
    const res = await fetch(baseGeoURL+q+`&limit=${limit}&appid=${key}`)
    if(!res.ok){
        throw new Error(`error: ${res.status}`)
    }
    const data = await res.json()
    // console.log(data)
    return data
}
export async function getWeather(endpoint,lat,lon) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/${endpoint}?lat=${lat}&lon=${lon}&units=metric&appid=${key}`)
    if(!res.ok){
        throw new Error(`error: ${res.status}`)
    }
    const data = await res.json()
    // console.log(data)
    return data
}
