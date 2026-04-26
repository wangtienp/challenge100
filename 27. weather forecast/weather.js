import { getWeather } from "./http.js"
const app = document.querySelector("#weather-app")
const urlParams = new URLSearchParams(window.location.search)
const lat = urlParams.get("lat")
const lon = urlParams.get("lon")
let icon
currentWeather()
async function currentWeather() {
    const data = await getWeather('weather', lat, lon)
    // console.log('data',data)
    updateForecastWeather()


    icon = data.weather[0].icon
    const today = new Date()
    const dateOption = {
        weekday: "short",
        day: "2-digit",
        month: "short"
    }
    const formatDay = today.toLocaleDateString('en-us', dateOption)
    const temp = Math.round(data.main.temp)
    const humid = data.main.humidity
    const wind = data.wind.speed
    const region = data.name
    const main = data.weather[0].main
    app.innerHTML = `
    <div class="weather-container">
        <a href="index.html" title="Go Back">
            <img src="./image/back.svg" id="back-arrow" />
        </a>
        <div class="name-date">
            <div class="name"><img src="./image/location.svg" class="pin"> <span>${region}</span></div>
            <div class="date">${formatDay}</div>
        </div>
        <div class = "weather-temp">
            <img class="icon" src="https://openweathermap.org/payload/api/media/file/${icon}.png"/>
            <div class="weather-main">
                <div class="celcius">${temp}&deg;C</div>
                <div>${main}</div>
            </div>
        </div>
        <div class="humidity-wind">
            <div class="label">
                <img class="hw-icon" src="./image/humid.svg">
                <div>
                    <p class="desc">Humidity</p>
                    <p class="main">${humid}%</p>
                </div>
            </div>
            <div class="label" >
                <img class="hw-icon" src="./image/wind.svg">
                <div>
                    <p class="desc">Wind Speed</p>
                    <p class="main">${wind} km/h</p>
                </div>
            </div>
        </div>
        <div class="forecast-list"></div>
    </div>
`
}

async function updateForecastWeather() {
    const forecasts = await getWeather('forecast', lat, lon)
    const forecastList = forecasts.list
    // console.log(forecasts)
    const timeText = "12:00:00"
    const todayDate = new Date().toLocaleDateString('en-CA')
    const forecastContainer = document.querySelector(".forecast-list")
    for (const forecast of forecastList) {
        const {
            dt_txt: date,
            main: { temp },
            weather: [{ icon }]
        } = forecast
        if (forecast.dt_txt.includes(timeText) && !forecast.dt_txt.includes(todayDate)) {
            const dateTaken = new Date(date)
            const dateOption =
            {
                day: "2-digit",
                month: "short"
            }
            const formatDate = dateTaken.toLocaleDateString('en-us', dateOption)
            
            const forecastContext=`
            <div class ="forecast">
                <p>${formatDate}</p>
                <img class="icon" src="https://openweathermap.org/payload/api/media/file/${icon}.png"/>
                <p>${Math.round(temp)}&deg;C</p>
            </div>
            `
            forecastContainer.insertAdjacentHTML('beforeend',forecastContext)
        }
    }
}
// app.innerHTML=`
//     <div class="weather-container">
//         <img class="icon" src="https://openweathermap.org/payload/api/media/file/${icon}.png"/>
//     </div>
// `