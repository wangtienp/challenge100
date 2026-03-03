const keys = document.querySelectorAll(".key")
const main = document.querySelector(".hero")
const defaultTitle = document.querySelector(".default")
const input = document.querySelector("#input")
window.addEventListener('keydown', (e) => {
    if (!e.repeat) {
        main.style.display = 'flex'
        defaultTitle.style.display = 'none'
        let keyboard = [e.key, e.code, e.keyCode, e.which]
        keys.forEach((key, index) => {
            key.textContent = keyboard[index]
        })
    }
})
input.addEventListener("keydown", (e) => {
    console.log(e)
    main.style.display = 'flex'
    defaultTitle.style.display = 'none'
    // let keyboard = [e.key, e.code, e.keyCode, e.which]
    // keys.forEach((key, index) => {
    //     key.textContent = keyboard[index]
    // })
})