import { getImage } from "./http.js"
// import { homepageIcon } from "./main.js"
const params = new URLSearchParams(window.location.search)
// console.log(savedObj)
const id = params.get("id")
const homepageIconEle = document.querySelector(".homepage-icon")
// console.log("image ",homepageIcon)
const imageContainer = document.querySelector(".img-container")
window.addEventListener("load",async ()=>{
    imageContainer.innerHTML=""
    console.log(id)
    const data = await getImage(id)
    const src = data.url
    const IsNsfw = data.isNsfw
    homepageIconEle.src = IsNsfw?'nsfw.jpg':'sfw.jpg'
    homepageIconEle.alt = IsNsfw?'nsfw':'sfw'
    const image = document.createElement("img")
    image.src = src
    imageContainer.append(image)
})


