const cards = document.querySelectorAll(".card")
cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        deleteAll(index)
        card.classList.toggle("open")
        const symbol = card.querySelector(".symbol")
        if (card.classList.contains("open")) {
            symbol.textContent = "-"
        } else {
            symbol.textContent = "+"
        }
    })
})

function deleteAll(index) {
    cards.forEach((card, removeIndex) => {
        if (index != removeIndex) {
            card.classList.remove("open")
            const symbol = card.querySelector(".symbol")
            symbol.textContent = "+"
        }
    })
}