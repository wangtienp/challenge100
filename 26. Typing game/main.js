const baseURL = "https://dogapi.dog/api/v2/"
const endpoint = "facts?limit=5"
const spinner = document.querySelector(".spinner")
const display = document.querySelector(".display")
const input = document.querySelector(".input")
const time = document.querySelector(".time")
const fill = document.querySelector(".fill")
const idleBoard = document.querySelector(".idle-board")
// const layer = document.querySelector(".layer")
let sentenceLength = 0, count = 0, lastTop = 0, isRunning = false, totalMilli = 0, fillProgress = 0, intervalId, timeOut
const initialMinMilli = time.textContent.slice(0, -3) * 60000

window.addEventListener('load', async () => {
    const dogFacts = await http(baseURL + endpoint)
    console.log('dog facts', dogFacts)
    for (const fact of dogFacts.data) {
        // display.textContent += fact.attributes.body +" "
        let sentence = fact.attributes.body
        // console.log(sentence)
        let words = sentence.split(" ")
        // console.log(words)
        insertWordContainer(words)
        insertLetter(words)
        sentenceLength += words.length
    }
    spinner.style.display = 'none'
    // initialized
    const firstLetter = display.querySelector(".letter-basic")
    firstLetter.classList.add("is-active")

    window.addEventListener("keydown", (e) => {

        const listToSkip = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "CapsLock", "F1",
            "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Delete", "Insert",
            "Pause", "ScrollLock", "Home", "End", "PageUp", "PageDown", "Shift", "Alt", "Ctrl"
        ]
        typing(listToSkip)
        scrollLine()
        startTimer(listToSkip)
        setIdle(listToSkip)
        // showHideLayer(display.scrollTop)
    })
})
async function http(url) {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error("Error: ", res.statusText);
    }
    const data = await res.json()
    // console.log(data)
    return data
}
function insertWordContainer(words) {
    let i = 0
    while (i < words.length) {
        const word = document.createElement("div")
        word.className = "screen-row"
        display.append(word)
        // console.log('factor', i)
        i++
    }
}
function insertLetter(words) {
    let screens = display.querySelectorAll(".screen-row")
    // console.log('screen length ', screens.length)
    // let screenArr = Array.from(screens)
    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        let screen = screens[i + sentenceLength]
        let letters = word.split('')
        letters.push(" ")
        // console.log('word', word)
        // console.log("letters ", letters)
        for (const letter of letters) {
            const letterClass = document.createElement("div")
            letterClass.className = "letter-basic"
            letterClass.textContent = letter
            screen.append(letterClass)
            // console.log('letter class inner text ',letterClass.innerText)
        }

    }
}

function typing(listToSkip) {
    if (event.repeat) return
    const allLetters = display.querySelectorAll(".letter-basic")
    const activeLetter = display.querySelector(".is-active")
    let key = event.key
    let location = event.location
    // console.log(location)
    if (location == 1 || location == 2) return

    if (listToSkip.includes(key)) {
        event.preventDefault()
        // console.log(key)
        return
    }
    if (key != "Backspace" && count < allLetters.length) {
        count++
        activeLetter.className = "letter-basic"
        allLetters[count].className = "letter-basic is-active"
        // console.log('count ', count)
        // console.log(key)
        // console.log(event)

    }
    if (key == "Backspace" && count > 0) {
        count--
        activeLetter.className = "letter-basic"
        allLetters[count].className = "letter-basic is-active"
    }
    matchingTypedWord(key)
}
function matchingTypedWord(key) {
    const allLetters = display.querySelectorAll(".letter-basic")
    if (count > 0 && key != "Backspace") {
        let previousCount = count - 1
        // console.log('key ', key, ' previous count ', previousCount, ' letter ', allLetters[previousCount])
        if (key == allLetters[previousCount].textContent) {
            allLetters[previousCount].className = "letter-basic typed"
            allLetters[previousCount].classList.add("is-correct")
        } else {
            allLetters[previousCount].className = "letter-basic typed"
            allLetters[previousCount].classList.add("is-wrong")
            allLetters[previousCount].setAttribute('data-wrong', key)
        }
    }
}
function scrollLine() {
    // const initialHeight = 175
    const activeLetter = document.querySelector(".is-active")
    let activeLetterPost = activeLetter.getBoundingClientRect().top
    const letterHeight = Math.abs(activeLetterPost - lastTop)

    let direction = 0

    if (lastTop == 0) {
        lastTop = activeLetterPost
        return
    }

    if (Math.floor(activeLetterPost) > Math.floor(lastTop)) {
        direction = 1
        // lastTop = activeLetterPost - letterHeight
        // console.log("scroll up - current post ", activeLetterPost," last top ",lastTop )
    }
    else if (Math.floor(activeLetterPost) < Math.floor(lastTop)) {
        direction = -1
        // console.log("scroll down - current post ", activeLetterPost," last top ",lastTop ," letter height ",letterHeight)
    }

    let option = {
        top: letterHeight * direction,
        behavior: "smooth"
    }
    display.scrollBy(
        option
    )
}

function startTimer(listToSkip) {
    let key = event.key

    if (listToSkip.includes(key)) {
        event.preventDefault()
        // console.log(key)
        return
    }
    if (isRunning) return
    isRunning = true
    idleBoard.style.top = '100%'
    idleBoard.style.opacity = '0'
    intervalId = setInterval(() => {
        runTimer()
        stopTimer(intervalId)
    }, 1000)
}

function runTimer() {
    // get the total milliseconds
    const secMilli = 1000
    const minMilli = 1000 * 60
    
    const minuteText = time.textContent.slice(0, -3)
    const secondText = time.textContent.slice(-2)
    let totalMinMilli = minMilli * minuteText
    let totalSecMilli = secMilli * secondText
    totalMilli = totalMinMilli + totalSecMilli
    if(totalMilli <=0) return

    // deduct 1 second then turn back to mins and second 
    totalMilli -= 1000
    fillProgress += 1000
    // console.log(totalMilli)
    let newMinText = Math.floor(totalMilli / minMilli)
    let newSecText = (totalMilli % minMilli) / 1000

    time.textContent = `${String(newMinText)}:${String(newSecText).padStart(2, "0")}`
    fill.style.width = `${(fillProgress / initialMinMilli * 100).toFixed(2)}%`
}
function stopTimer(intervalId) {
    if (totalMilli <= 0) {
        clearInterval(intervalId)
        isRunning = false
        finish()
    }
}
function setIdle(listToSkip) {
    // console.log(listToSkip)
    let key = event.key
    if (listToSkip.includes(key)) {
        event.preventDefault()
        return
    } else {
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            if (totalMilli > 0) {
                clearInterval(intervalId)
                isRunning = false
                idleBoard.style.top = '80%'
                idleBoard.style.opacity = '1'
            }
        }, 5000)
    }
}

function finish() {
    //  calculate wpm and accuracy
    const typedChars = document.querySelectorAll(".typed")
    const typedCharsLength = typedChars.length
    const wpm = Math.round(typedCharsLength/5)

    const wrongTypeChars = document.querySelectorAll("[data-wrong]")
    const wrongTypeCharsLength = wrongTypeChars.length
    const accuracy = Math.round(((typedCharsLength - wrongTypeCharsLength)/typedCharsLength) * 100 )

    display.innerHTML =
    `
        <div class= "result">
            <p>You achieve &nbsp; <h3>WPM of ${wpm}</h3> &nbsp; with &nbsp; <h3>Accuracy of ${accuracy}%</h3> </p>
        </div>
    `
}