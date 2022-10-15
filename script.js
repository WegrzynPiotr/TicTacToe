const cells = [...document.querySelectorAll("[data-cell]")];
const X_SYMBOL = "x"
const CIRCLE_SYMBOL = "circle"
let symbols = [X_SYMBOL, CIRCLE_SYMBOL]
let currentSymbol = symbols[Math.floor((Math.random() * symbols.length))];
const board = document.getElementById("board");
const winningMessageText = document.querySelector("[data-winning-message-text]")
const winningMessageElement = document.querySelector(".winning-message")
board.classList.add(currentSymbol)
const restartButton = document.getElementById("restartButton");
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const putSymbol = (e) => {
    if (board.className == `board ${X_SYMBOL}`) {
        board.className = `board ${CIRCLE_SYMBOL}`
        currentSymbol = X_SYMBOL
    }
    else if (board.className == `board ${CIRCLE_SYMBOL}`) {
        currentSymbol = CIRCLE_SYMBOL
        board.className = `board ${X_SYMBOL}`
    }
    e.target.className = `cell ${currentSymbol}`
    board.classList.remove(currentSymbol)


    // if(board.className== `board ${CIRCLE_SYMBOL}`)
    // e.target.classList.remove(currentSymbol)
}


const isDraw = () => {
    return cells.every(cell => {
        return cell.classList.contains(X_SYMBOL) || cell.classList.contains(CIRCLE_SYMBOL)
    })
}

const endGame = (draw) => {
    if (draw) {
        winningMessageText.textContent = "Remis!"
        restartButton.addEventListener("click", () => location.reload())
    } else {
        winningMessageText.textContent = `${currentSymbol == CIRCLE_SYMBOL ? "wygrało kółko" : "wygrał krzyżyk"}!`
        restartButton.addEventListener("click", () => location.reload())
    }
    winningMessageElement.classList.add("show")
}

const checkWinner = (e) => {
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentSymbol)
        })
    })
}
const clickHandler = (e) => {
    putSymbol(e)
    if (checkWinner(e)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    }
}


cells.forEach(cell => cell.addEventListener('click', clickHandler, { once: true }))

