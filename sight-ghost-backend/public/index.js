try {
    const response = await fetch("/api")
    if(!response.ok){
        const errorData = await response.text()
        console.log(errorData)
        document.open()
        document.write(errorData)
        document.close()
    }
    const data = await response.json()
    renderCard(data)
} catch (error) {
    console.log(error)
}

function renderCard(cardsData) {
    const sightingContainer = document.querySelector(".sighting-list")
    let cardsHTML = ""
    cardsData.forEach((card) => {
        cardsHTML += `
            <div class="sighting less">
                <div class="date-location">${card.timestamp}, ${card.location}</div>
                <h2 class="sighting-title">${card.title}</h2>
                <div class="sighting-detail">${card.text}</div>
            </div>
        `
    })
    sightingContainer.innerHTML = cardsHTML
    const sightings = document.querySelectorAll(".sighting")

    window.addEventListener('load', () => {
        sightings.forEach((card, i) => {
            if (card.scrollHeight > 375) {
                card.innerHTML +=
                    `<div class="layer">
                <span class="read-full">Read in full</span>
                </div>`
            }
        })

    })
}
//  handle read more and less toggle
document.querySelector('.sighting-list').addEventListener('click', (event) => {
    let targetText = event.target.innerText
    if (event.target.classList[0] === 'layer') {
        const parentEle = event.target.offsetParent
        toggleFull(parentEle, event.target)

    }
    else if (event.target.classList[0] === 'read-full') {
        const layerEle = event.target.offsetParent
        const parentEle = layerEle.offsetParent
        toggleFull(parentEle, layerEle)
    }
})

function toggleFull(parentEle, layerEle) {
    parentEle.classList.toggle("less")
    event.target.innerText = parentEle.classList.contains("less") ? "Read in full" : "Show less"
    layerEle.style.background = parentEle.classList.contains("less") ? 'linear-gradient(180deg, rgba(209, 209, 209, 0) 0%, rgba(255, 255, 255, 1) 30%)' : 'none'
}