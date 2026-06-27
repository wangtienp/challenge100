let home = 0
let guess = 0
const defaultTimerText = document.querySelector(".timer").textContent.trim()
const scoreButtons = document.querySelectorAll(".score-buttons > button")
const newGameButton = document.querySelector(".new-game > button")
const homeScoreboard = document.querySelector(".home.scoreboard")
const guestScoreboard = document.querySelector(".guest.scoreboard")
const timerText = document.querySelector(".timer")
let isGaming = false
let intervalId
newGameButton.addEventListener("click", () => {
    isGaming = !isGaming
    timerText.textContent = defaultTimerText
    gameButton()
    scoreButton()
    defaultScore()
    timer()
    getLeading()
})
const gameButton = () => {
    newGameButton.textContent = isGaming ? 'Reset Game' : 'New Game'
}
const scoreButton = () => {
    scoreButtons.forEach(button => {
        button.disabled = isGaming ? false : true
    })
}
const timer = () => {
    const timerTextTrim = timerText.textContent.trim()
    let minText = timerTextTrim.slice(0, 2)
    let secText = timerTextTrim.slice(-2)

    let min = parseInt(minText, 10) * 60 * 1000
    let sec = parseInt(secText, 10) * 1000

    let total = min + sec

    if (isGaming) {
        intervalId = setInterval(() => {
            total -= 1000;
            let displayMin = Math.floor(total / 60000)
            let displaySec = (total % 60000) / 1000

            timerText.textContent = `${displayMin.toString().padStart(2, '0')}:${displaySec.toString().padStart(2, '0')}`

            if (total <= 0) {
                isGaming = false
                scoreButton()
                gameButton()
                clearInterval(intervalId)
            }
        }, 1000)
    }
    else {
        clearInterval(intervalId)
    }

}
function addHomeScore(score) {
    home += score
    homeScoreboard.textContent = home
    getLeading()
}
function addGuessScore(score) {
    guess += score
    guestScoreboard.textContent = guess
    getLeading()
}
function defaultScore() {
    home = 0
    guess = 0
    homeScoreboard.textContent = home
    guestScoreboard.textContent = guess
}

function getLeading(){
    if(home>guess){
        homeScoreboard.classList.add("leading")
        guestScoreboard.classList.remove("leading")
    }else if(home === guess){
        homeScoreboard.classList.remove("leading")
        guestScoreboard.classList.remove("leading")
    }else{
        homeScoreboard.classList.remove("leading")
        guestScoreboard.classList.add("leading")
    }
}