import { getGalleryImg } from "./http.js"
const defaultSetting = {
    IsNsfw: "False",
    dataTab: "0",
    homepageIcon: "sfw"
}
const LOCALSTORAGEKEY = "KEYS"
const homepageIconEle = document.querySelector(".homepage-icon")
const gallery = document.querySelector(".gallery")
const view = document.querySelector(".view")
const navBars = document.querySelectorAll("nav")
const sideMenuBtn = document.querySelector(".menu")
const savedObj = getData()
console.log(savedObj)
const retryBtn = document.querySelector(".retry-btn")
window.addEventListener('load', () => {
    // getGalleryImg(IsNsfw)
    getSidebar(savedObj.dataTab)
    getImage(savedObj.IsNsfw)
    getHompageIcon(homepageIconEle,savedObj.homepageIcon)
})
retryBtn.addEventListener("click", ()=>{
    console.log('retry',savedObj)
    getImage(savedObj.IsNsfw)
} )

async function getImage(IsNsfw) {
    gallery.innerHTML = ""
    const data = await getGalleryImg(IsNsfw)
    console.log(data)
    const items = data.items
    items.map((item) => {
        gallery.innerHTML += `
            <div class="each-img" style="aspect-ratio : ${item.width}/${item.height}">
                <a href="./images.html?id=${item.id}" class="link">
                   
                    <img src="${item.url}" class="gallery-img" alt = "image-${item.id}" loading="lazy">
                </a>
            </div>
        `
        // image.addEventListener('load', handleLoader(image, loader))
        // image.addEventListener('load', handleLoader(image))
    })
    handleLoader()
}
function handleLoader(){
    const imgDivs = document.querySelectorAll(".each-img")
    imgDivs.forEach((imgDiv,count)=>{
        const img = imgDiv.querySelector("img")

        function loaded(){
            // const loader = imgDiv.querySelector(".loader")
            // console.log('loader ',count)
            // loader.remove()
            imgDiv.classList.add("loaded")
        }

        if(img.complete){
            loaded()
        }else{
            img.addEventListener('load',loaded)
        }
    })
}
navBars.forEach(navBar => {
    navBar.addEventListener("click", () => {
        if (navBar.classList.contains("active")) return
        else {
            navBars.forEach(nav => {
                nav.classList.remove("active")
            })
            navBar.classList.add("active")
            const fixed = document.querySelector(".fixed")
            if(fixed){
                fixed.remove()
            }
            defaultSetting.dataTab = navBar.dataset.tab
            defaultSetting.IsNsfw = navBar.dataset.tab == "0" ? "False" : "True"
            defaultSetting.homepageIcon = navBar.dataset.tab == "0" ? "sfw" : "nsfw"
            setData()
            getImage(defaultSetting.IsNsfw)
            getHompageIcon(homepageIconEle,defaultSetting.homepageIcon)
        }
    })
})
function getSidebar(dataTab) {
    navBars.forEach(navBar => {
        navBar.classList.remove("active")
    })
    let dataNum = parseInt(dataTab)
    navBars[dataNum].classList.add("active")
}
function setData() {
    localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(defaultSetting))
}
function getData() {
    const savedData = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY)) || defaultSetting
    return savedData
}
sideMenuBtn.addEventListener("click", () => {
    // add the side menu of phone size
    const fixed = document.createElement("div")
    fixed.className = "fixed"
    const backdrop = document.createElement("div")
    backdrop.className = "backdrop"
    const sideMenu = document.createElement("div")
    sideMenu.className = "sidebar-menu"
    sideMenu.innerHTML =
        `
    <div class='side-header'>
    <h3>Menu</h3>
    <button class="close-sidemenu"><img src="close.png" alt="close"></button>
    </div>`
    navBars.forEach(navBar => {
        const cloneBar = navBar.cloneNode(true)
        sideMenu.append(cloneBar)
        console.log(cloneBar)
    })
    fixed.append(sideMenu)
    fixed.append(backdrop)
    view.prepend(fixed)
    closeMenu()
})
function getHompageIcon(homepageIconEle, obj) {
    homepageIconEle.src = `${obj}.jpg`
    homepageIconEle.alt = `${obj}`
}

function closeMenu(){
    const fixed = document.querySelector(".fixed") // to remove
    const closeBtn = document.querySelector(".close-sidemenu")
    const backdrop = document.querySelector(".backdrop")
    window.addEventListener("click",(e)=>{
        if(e.target.className == "backdrop" ||e.target.parentElement == closeBtn){
            fixed.remove()
        }
    })
}