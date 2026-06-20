const container = document.querySelector(".container")
const clearBtn = document.querySelector(".clear")
const winnerEl = document.querySelector(".winner")
let choices = []
let isGameOver = false
let player = "X"
let winner = ""
const winningRules = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
container.addEventListener("click", (e) => {
    const index = e.target.dataset.index
    if (choices.some(choice => choice.index == index)||isGameOver) return
    choices = [...choices, { index, player }]
    changePlayer()
    updateCanvas()
    checkWinner()
})

function updateCanvas() {
    winnerEl.textContent = `${player}'s turn`
    const boxes = document.querySelectorAll(".box")
    choices.map(c=>boxes[c.index].textContent = c.player)
}
function changePlayer() {
    player = player == "X" ? "O" : "X"
}

function checkWinner(){
    const boxes = document.querySelectorAll(".box")
    const boxArr = Array.from(boxes)
    
    winningRules.forEach(ruleWin=>{
        const textA = boxes[ruleWin[0]].textContent 
        const textB = boxes[ruleWin[1]].textContent 
        const textC = boxes[ruleWin[2]].textContent
        if(textA == textB && textB == textC && textA!=""){
            winner = textA
            isGameOver = true
            winnerEl.textContent = `${winner} won`
        } 
        if(boxArr.every(box=>box.textContent !="")&& !isGameOver){
            isGameOver = !isGameOver
            winnerEl.textContent = "Tie"
        }
    })
    if(isGameOver)clearBtn.disabled = false
}
clearBtn.addEventListener("click", clear)

function clear() {
    isGameOver = false
    const boxes = document.querySelectorAll(".box")
    boxes.forEach(box => box.textContent = "")
    choices.length = 0
    player = "X"
    clearBtn.disabled = true
    updateCanvas()
}

