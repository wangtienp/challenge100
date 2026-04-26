import  {getLonLat} from "./http.js"
const app = document.querySelector("#app")

app.innerHTML =
`<div class='container'>
    <h1 class='header'>Let 's forecast the weather</h1>
    <input type='text' id="weather-input" placeholder = "Please type your city or area" />
    <div class="location-bar"></div>
    </div>`
const locationBar = document.querySelector(".location-bar")
const weatherInput = document.querySelector("#weather-input")
weatherInput.addEventListener('input',async (e)=>{
   let locations = await getLonLat(e.target.value)
   if(locations.length>0){
    locationBar.style.display = 'block'
       displayBar(locations)
   }else{
        locationBar.style.display = 'none'
   }
})

function displayBar(locations){
    locationBar.innerHTML =''
    for(const location of locations){
        let bar = document.createElement('a')
        bar.href = `./weather.html?lat=${location.lat}&lon=${location.lon}`
        bar.className="bar"
        bar.innerHTML = `<img src="https://flagsapi.com/${location.country}/flat/64.png" class="country-flag"><span>${location.name}, ${location.country}</span>`
        locationBar.append(bar)
        // locationBar
    }
    // console.log("bar", bar)
}
