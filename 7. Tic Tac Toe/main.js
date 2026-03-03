let grids = document.querySelectorAll(".grid")
let whosTurn = document.querySelector(".whosturn")
let winner = document.querySelector(".winner")
let restartButton = document.querySelector(".restart")
let gameOver = false
let player = "X"
let turn = 0

initializedGame()
function initializedGame() {
    getTurn()
    getClicked()
    restartGame()
}
function OTurn() {
    return turn % 2 == 0
}
function winRules() {
    const [g1, g2, g3, g4, g5, g6, g7, g8, g9] = grids

    const checkMatch = (c1, c2, c3) => {
        const content1 = c1.textContent;
        // Check if content is non-empty AND all three match the content
        return content1 !== "" && content1 === c2.textContent && content1 === c3.textContent
    };
    // horizontal rules
    if ((checkMatch(g1, g2, g3)) || checkMatch(g4, g5, g6) || checkMatch(g7, g8, g9)) {
        gameOver = true;
    }
    //Vertical rules
    else if ((checkMatch(g1, g4, g7)) || checkMatch(g2, g5, g8) || checkMatch(g3, g6, g9)) {
        gameOver = true;
    }

    // Diagonal rules
    else if ((checkMatch(g1, g5, g9)) || checkMatch(g3, g5, g7)) {
        gameOver = true;
    }

}
function getTurn() {
    if (winner.textContent == "") {
        whosTurn.textContent = `${player}'s turn`
    } else {
        whosTurn.textContent = ""
    }
}
function declareWinner() {
    if (gameOver) {
        winner.textContent = `Winner is ${player}`
    } else if (!gameOver && turn >= 8) {
        gameOver = true;
        winner.textContent = "Draw"
    }
}
function getClicked() {
    grids.forEach(grid => {
        grid.addEventListener("click", () => {
            if (grid.textContent != "" || gameOver) return;
            grid.textContent += player
            winRules()
            declareWinner()
            player = OTurn() ? "O" : "X"
            getTurn()
            turn++
        })
    })
}

function restartGame(){
    restartButton.addEventListener("click",()=>{
        if(!gameOver)return
        else{
            gameOver = !gameOver
            grids.forEach(grid=>{
                grid.textContent =""
            })
            player ="X"
            winner.textContent =""
            turn = 0
            getTurn()
        }
    })
}
