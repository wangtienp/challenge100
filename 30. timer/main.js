const input = document.querySelector("input")
let canReset = true
let defaultVal = '000000'
const mainInput = document.querySelector(".main-input")
const progressDisplay = document.querySelector(".container > .body")
const playPause = document.querySelector(".playpause")
const replayButton = document.querySelector(".reset")
const selection = document.querySelector(".selection")
const plusTimeButtons = document.querySelectorAll(".plustime")
let times
let intervalId
let secNum, progressTotalSec
let replaySixDigit
let isReplayId = 1
let sixDigit
const audio = new Audio("./timer.wav")

window.addEventListener("load",()=>{
    sixDigit = localStorage.getItem("sixDigit")||"000500"
    convertTime()
})
replayButton.addEventListener("click", () => {
    replayButton.style.display = "none"
    if (!playPause.classList.contains("to-play")) {
        playPause.classList.add("to-play")
    }
    selection.style.display = "flex"
    playPause.style.display = "flex"
    mainInput.style.setProperty('--display','block')
    replay()
})
playPause.addEventListener("click", () => {
    // setInputRange()
    // play
    if (playPause.classList.contains("to-play")) {
        playTimer()
        playPause.classList.remove("to-play")
        selection.style.display = "none"
        replayButton.style.display = "flex"
        mainInput.style.setProperty('--display','none')
        isReplayId = 0
    }
    // pause
    else {
        clearInterval(intervalId)
        playPause.classList.add("to-play")
        selection.style.display = "flex"
        mainInput.style.setProperty('--display','block')
    }
})
plusTimeButtons.forEach(plusTimeButton => {
    plusTimeButton.addEventListener('click', () => {
        let valueText = plusTimeButton.getAttribute('aria-valuetext')
        plusTime(valueText)
    })
})
input.addEventListener("click", () => {
    //set the input text selection to end
    // setInputRange()
    initializedTimer()
    if (!playPause.classList.contains("to-play")) {
        clearInterval(intervalId)
        playPause.classList.add("to-play")
    }
    mainInput.style.setProperty('--display','block')
    mainInput.style.setProperty('--main-input-length','150px')
    selection.style.display = "flex"
})
input.addEventListener('blur', () => {
    // console.log('focus out')
    canReset = true
    reset()
    convertTime()
    mainInput.style.setProperty('--main-input-length','105px')
    document.title = getTimeAccDigit(times.hrStr, times.minStr, times.secStr)
})
input.addEventListener("input", (e) => {
    typing(e)

})
input.addEventListener("keydown", (e) => {
    allowOnlyNumber(e)
    // typing(e)
})

function setInputRange() {
    let length = input.value.length
    input.setSelectionRange(length, length)
}
function initializedTimer() {
    let currentValue = input.value;
    let initStr = currentValue.padStart(8, "0")
    let strArr = initStr.split('')
    for (let i = 2; i < initStr.length; i += 3) {
        strArr[i] = ':'
    }
    let newInitStr = strArr.join('')
    // console.log(newInitStr)
    input.value = newInitStr
    setInputRange()
}
function allowOnlyNumber(e) {
    if (isNaN(e.key) && e.key !== 'Backspace') {
        e.preventDefault()
    }
}

function reset() {
    if (canReset) {
        // console.log('reset')
        // input.value = '0'
        initializedTimer()
        defaultVal = '000000'
        canReset = false
    }
}
function typing(e) {
    // if(!canReset){
    //     defaultVal += e.data
    // }
    if (e.inputType == "deleteContentBackward") {
        defaultVal = defaultVal.slice(-6, -1).padStart(6, '0')

    }
    if (e.inputType == "insertText") {
        defaultVal += e.data
        defaultVal = defaultVal.trim()
    }
    sixDigit = defaultVal.slice(-6)
    localStorage.setItem("sixDigit",sixDigit)
    // split and join the string as an array of character in order to insert : character in it
    let splitSix = sixDigit.split("")
    splitSix.splice(2, 0, ":")
    splitSix.splice(5, 0, ":")
    // console.log('split six', splitSix)
    let joinStr = splitSix.join("")
    // console.log("join str", joinStr)
    e.target.value = joinStr
    isReplayId = 1
}

function convertTime() {
    times = convertTorealTime(sixDigit)
    // console.log()
    // console.log('hr ', times.hrStr, ' min ', times.minStr, ' sec ', times.secStr)
    input.value = getTimeAccDigit(times.hrStr, times.minStr, times.secStr)
}

function getTimeAccDigit(hour, min, sec) {
    let hourNum = parseInt(hour)
    let minNum = parseInt(min)
    let secNum = parseInt(sec)
    let returnString = `${hour}:${min}:${sec}`
    if (hourNum == 0) {
        if (minNum == 0) {
            if (secNum >= 10) {
                returnString = returnString.slice(-2)
            }
            else {
                returnString = returnString.slice(-1)
            }
        }
        else if (minNum >= 10) {
            returnString = returnString.slice(3)
        }
        else if (minNum < 10) {
            returnString = returnString.slice(4)
        }
    }
    else if (hourNum < 10) {
        returnString = returnString.slice(1)
    }
    return returnString
}

// get hr, min and sec in the form of string from sixDigit such as 000500 =00 hr 05 min 00 sec
function convertTorealTime(digit) 
{
    //  if sixDigit > maxDigit / max time allowed, then make sixDigit = maxDigit
    const maxDigit = 995959
    let numDigit = parseInt(digit)
    if (numDigit > maxDigit) {
        numDigit = maxDigit
    }
    sixDigit = numDigit.toString().padStart(6, '0')
    let times = []
    for (let i = 0; i < sixDigit.length; i += 2) {
        times.push(sixDigit[i] + sixDigit[i + 1])
    }

    let [hrStr, minStr, secStr] = times
    let [hrNum, minNum, secNum] = [parseInt(hrStr, 10), parseInt(minStr, 10), parseInt(secStr, 10)]

    if (secNum >= 60) {
        secNum -= 60
        minNum++
    }
    if (minNum >= 60) {
        minNum -= 60
        hrNum++
    }
    [hrStr, minStr, secStr] = [hrNum.toString().padStart(2, '0'), minNum.toString().padStart(2, '0'), secNum.toString().padStart(2, '0')]
    return { hrStr, minStr, secStr }
}

function playTimer() {
    // get the total second of secNum
    secNum = getTotalSec(sixDigit)
    if (isReplayId > 0) {
        replaySixDigit = sixDigit
    }
    // get the total second of the progress/static/total seconds
    progressTotalSec = getTotalSec(replaySixDigit)
    reduceTime()
}

// get the total seconds
function getTotalSec(digit) {
    let hrStr = digit[0] + digit[1]
    let minStr = digit[2] + digit[3]
    let secStr = digit[4] + digit[5]

    let hrNum = parseInt(hrStr)
    let minNum = parseInt(minStr)
    let secNum = parseInt(secStr)

    // convert hr and min to sec

    let hrtoSec = hrNum * 3600
    let mintoSec = minNum * 60

    //  combine together
    let totalSec = hrtoSec + mintoSec + secNum

    return totalSec
}

// reduce the secNum 1 sec every 1000ms
function reduceTime() {
    intervalId = setInterval(() => {
        secNum--
        displayTime(secNum)
        displayProgress()
        if (secNum <= 0) {
            clearInterval(intervalId)
            playPause.style.display = "none"
            audio.play()
        }
    }, 1000)
}
// convert the secNum back to the hr:min:sec
function displayTime(reduceSec) {
    let sectoHr = Math.floor(reduceSec / 3600)
    let sectoMin = Math.floor((reduceSec % 3600) / 60)
    let sec = (reduceSec % 3600) % 60
    // console.log('hr :', sectoHr, " min: ",sectoMin," sec: ",sec)
    sixDigit = sectoHr.toString().padStart(2, '0') +
        sectoMin.toString().padStart(2, '0') +
        sec.toString().padStart(2, '0')
    // console.log(sixDigit)
    // times = convertTorealTime(sixDigit)
    // input.value = getTimeAccDigit(times.hrStr, times.minStr, times.secStr)
    convertTime()
    document.title = getTimeAccDigit(times.hrStr, times.minStr, times.secStr)
}

function replay() {
    audio.pause()
    audio.currentTime = 0
    clearInterval(intervalId)
    sixDigit = replaySixDigit
    convertTime()
    // times = convertTorealTime(sixDigit)
    // input.value = getTimeAccDigit(times.hrStr, times.minStr, times.secStr)
    document.title = getTimeAccDigit(times.hrStr, times.minStr, times.secStr)
    progressDisplay.style.setProperty('--fill', '100%')
}
function plusTime(buttonText) {
    let buttonNum = parseInt(buttonText)
    let sixDigitNum = parseInt(sixDigit)
    let newValue = buttonNum + sixDigitNum;
    sixDigit = newValue.toString().padStart(6, '0')
    localStorage.setItem("sixDigit",sixDigit)
    convertTime()
    // times = convertTorealTime(sixDigit)
    // input.value = getTimeAccDigit(times.hrStr, times.minStr, times.secStr)
    document.title = getTimeAccDigit(times.hrStr, times.minStr, times.secStr)
    isReplayId = 1
}
function displayProgress() {
    let percentNum = (secNum / progressTotalSec) * 100
    let percentStr = percentNum.toFixed(2)
    progressDisplay.style.setProperty('--fill', percentStr + '%')
}