// Gameboard object, module pattern with IIFE
const Gameboard = (() => {
    let board = Array(9).fill(null); // Initialize an empty board
  
    const getBoard = () => board;
  
    const setBoard = (index, symbol) => {
      board[index] = symbol;
    };
  
    const resetBoard = () => {
      board = Array(9).fill(null);
    };
  
    return { getBoard, setBoard, resetBoard };
})(); 
  
// Player object, factory function
// Name and symbol are private variables, captured in a closure
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol };
};
  
// Game object, module pattern with IIFE
// Player objects are created and stored in the Game object
const Game = (() => {
    let player1 = Player("Player 1", "X");
    let player2 = Player("Player 2", "O");
    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const playTurn = (index) => {
        Gameboard.setBoard(index, currentPlayer.getSymbol());
        if (checkWin()) {
            console.log(`${currentPlayer.getName()} wins!`);
        } else if (checkTie()) {
            console.log("It's a tie!");

        } else {
            switchPlayer();
        }
    };

    const checkWin = () => {
        // Implement win logic

        // Check rows
        for (let i = 0; i < 9; i += 3) {
            if (Gameboard.getBoard()[i] && Gameboard.getBoard()[i] === Gameboard.getBoard()[i + 1] && Gameboard.getBoard()[i] === Gameboard.getBoard()[i + 2]) {
                return true;
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (Gameboard.getBoard()[i] && Gameboard.getBoard()[i] === Gameboard.getBoard()[i + 3] && Gameboard.getBoard()[i] === Gameboard.getBoard()[i + 6]) {
                return true;
            }
        }

        // Check diagonals
        // Top-left to bottom-right
        if (Gameboard.getBoard()[0] && Gameboard.getBoard()[0] === Gameboard.getBoard()[4] && Gameboard.getBoard()[0] === Gameboard.getBoard()[8]) {
            return true;
        } 
        // Top-right to bottom-left
        else if (Gameboard.getBoard()[2] && Gameboard.getBoard()[2] === Gameboard.getBoard()[4] && Gameboard.getBoard()[2] === Gameboard.getBoard()[6]) {
            return true;
        } 
    };

    const checkTie = () => {

        // Check if board is full
        if (!Gameboard.getBoard().includes(null)) {
            return true;
        }

        return false;
    };

    return { playTurn };
})();

// Event listeners
const cells = document.querySelectorAll(".cell");
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (!Gameboard.getBoard()[index]) {
            Game.playTurn(index);
            render();
        }
    });
});

// Reset button
const resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", () => {
    Gameboard.resetBoard();
    render();
});

// Render function
const render = () => {
    cells.forEach((cell, index) => {
        cell.textContent = Gameboard.getBoard()[index];
    });
};

// Initialize game
render();





