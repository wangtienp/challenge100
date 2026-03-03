const milliSec = document.querySelector(".millisec");
const hourEle = document.querySelector(".hour")
const minuteEle = document.querySelector(".min")
const secondEle = document.querySelector(".sec")
const playPauseBtn = document.querySelector(".playpause")
const resetBtn = document.querySelector(".reset")


let intervalId
let startTime = 0, elapsedTime = 0

playPauseBtn.addEventListener("click", playPause)
resetBtn.addEventListener("click",reset)
function playPause() {
    startTime = performance.now() - elapsedTime
    if (playPauseBtn.classList.contains("to-pause")) {
        // console.log(" STOPPPPPPP elapsed time: "+elapsedTime + " start : "+startTime+" timestamp : "+ performance.now())
        clearInterval(intervalId)
    } else {
        intervalId = setInterval(() => {
            elapsedTime = performance.now() - startTime
            updateDisplay(elapsedTime)
            // console.log("elapsed time: "+elapsedTime + " start : "+startTime+" timestamp : "+ performance.now())
            // milliSec.textContent = performance.now().toFixed(0).toString()
        }, 10)
    }
    // console.log(" CLICKKKKKKKKK elapsed time: "+elapsedTime + " start : "+startTime+" timestamp : "+ performance.now())
    playPauseBtn.classList.toggle("to-pause")
}

function updateDisplay(time) {
    let millisec = Math.floor(time % 1000);
    let seconds = Math.floor((time % 60000) / 1000)
    let minutes = Math.floor((time % (1000 * 60 * 60)) / 60000)
    let hours = Math.floor(time / (1000 * 60 * 60))
    milliSec.textContent = `${millisec.toString().padStart(3, '0')}`
    secondEle.textContent = `${seconds.toString().padStart(2, '0')}`
    minuteEle.textContent = `${minutes.toString().padStart(2, '0')}`
    hourEle.textContent = `${hours.toString().padStart(2, '0')}`
}
function reset() {
    playPauseBtn.classList.remove("to-pause")
    clearInterval(intervalId)
    startTime = 0, elapsedTime = 0;
    updateDisplay(elapsedTime)
}