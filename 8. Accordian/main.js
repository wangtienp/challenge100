const cards = document.querySelectorAll(".card")
cards.forEach(card=>{
    card.addEventListener("click",()=>{
        card.classList.toggle("open");
        const symbol = card.querySelector(".symbol")
        if(card.classList.contains("open")){
            symbol.textContent ="-"
        }else{
            symbol.textContent = "+"
        }
    })
}) 