const p1 = "R";
const p2 = "B";
let player = p1;

const gameOver = false;
let board;

let rows = 6;
let columns = 7;
let currColumns = [];

window.onload = function() {
    setGame();
    winner.innerText = "Red's Turn. Click any Slot to Start Game"
    winner.style.color = "red";
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c]; 

    if (r < 0) { 
        return;
    }

    //now update board
    board[r][c] = player;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (player == p1) {
        tile.classList.add("red-piece");
        player = p2;
        winner.innerText = "Blue's Turn"
        winner.style.color = "Blue";
    }
    else {
        tile.classList.add("blue-piece");
        player = p1;
        winner.innerText = "Red's Turn"
        winner.style.color = "red";
    }

    r -= 1;
    //update the array
    currColumns[c] = r; 

    checkWinner();
}

//horizontal direction to win
function checkWinner() {
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical direction to win
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // diagonal direction to win
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // anti diagonal direction to win
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == p1) {
        winner.innerText = "Red Wins!"; 
        winner.style.color = "red";          
    } else {
        winner.innerText = "Blue Wins!";
        winner.style.color = "blue";
    }
    gameOver = true;
}

const h2 = document.querySelector('h2');

setInterval(function () { 
    h2.classList.toggle('big')
    h2.classList.toggle('small')
    }, 1000);