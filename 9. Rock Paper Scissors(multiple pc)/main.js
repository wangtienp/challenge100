let choiceImgs = document.querySelectorAll(".choices>img")
// let myScoreEl = document.querySelector(".my.score")
// let pcScoreEls = document.querySelectorAll(".pc.score")
let scoreEls = document.querySelectorAll(".score")
let resultDisplay = document.querySelector(".result>.display")
let choices = ['rock', 'paper', 'scissor']
let allChoices = [], result="";
const pcAmount = 2;
let myChoiceEl = document.querySelector(".pick.my>.choice")
let pcChoiceEls = document.querySelectorAll(".pick.pc>.choice")
let allScores = [0, 0, 0]
let winner = ""
// let winnerCount = 0;
const choiceSet = new Set()
// console.log(choiceImgs)
initialise()
function initialise() {
    choiceImgs.forEach(choiceImg => {
        choiceImg.addEventListener("click", (e) => {
            // console.log(e)
            getMyChoice(e)
            getPCChoice(choices)
            updateWinner()
            updateScore()
            updateResult()
        })
    })
}


function getMyChoice(e) {
    let myChoice = e.target.dataset.session
    // console.log(myChoice)
    myChoiceEl.innerHTML = `<img src="images/${myChoice}.png" alt = "my choice">`
    choiceSet.add(myChoice)
    allChoices.push(myChoice)
}
function getPCChoice(choice) {
    for (let i = 0; i < pcAmount; i++) {
        let randomNm = Math.floor(Math.random() * 3)
        choiceSet.add(choice[randomNm])
        allChoices.push(choice[randomNm])
        pcChoiceEls[i].innerHTML = `<img src="images/${allChoices[i + 1]}.png" alt = "PC ${i + 1} choice"/>`
        console.log(pcChoiceEls[i].innerHTML)
    }
    // console.log(allChoices)

}

function updateWinner() {
    let choiceSetArr = Array.from(choiceSet)
    if (choiceSetArr.length == 2) {
        if (choiceSetArr[0] == "rock") {
            winner = choiceSetArr[1] == "scissor" ? "rock" : "paper"
        }
        else if (choiceSetArr[0] == "paper") {
            winner = choiceSetArr[1] == "rock" ? "paper" : "scissor"
        }
        else if (choiceSetArr[0] == "scissor") {
            winner = choiceSetArr[1] == "paper" ? "scissor" : "rock"
        }
    }
    // console.log(winner)
    // console.log("size: " + choiceSet.size)

}
function updateScore() {
    if (choiceSet.size == 2) {
        for (let index = 0; index < allChoices.length; index++) {
            if (allChoices[index] == winner) {
                allScores[index]++
                console.log(allScores)
                // winnerCount++
            }
            scoreEls[index].textContent = allScores[index].toString()
        }
    }
}
function updateResult() {
    
    if (choiceSet.size != 2) {
        result = "Tie"
    } else {
        for (let i = 0; i < allChoices.length; i++) {
            if (i == 0) {
                if (allChoices[i] == winner) {
                    result += "You won "
                }
            }
            else if (allChoices[i] == winner) {
                result += `PC ${i} won `
            }
        }
    }
    // console.log(result)
    resultDisplay.textContent = result

    result = ""
    choiceSet.clear()
    allChoices.length = 0
}