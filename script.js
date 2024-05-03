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
    // Get reference to game result element
    const gameResult = document.querySelector("#game-result");

    let player1 = Player("Player 1", "X");
    let player2 = Player("Player 2", "O");
    let currentPlayer = player1;
    let gameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const resetGame = () => {
        gameOver = false; 
    };

    const playTurn = (index) => {
        if (gameOver) return;

        Gameboard.setBoard(index, currentPlayer.getSymbol());
        render();
    
        if (checkWin()) {
            gameResult.textContent = `${currentPlayer.getName()} wins!`;
            gameOver = true;
            return;
        } 
    
        else if (checkTie()) {
            gameResult.textContent = "It's a tie!";
            gameOver = true;
            return;
        }
    
        else {
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

    return { playTurn, resetGame, gameResult};
})();

// Event listeners
const cells = document.querySelectorAll(".cell");
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (!Gameboard.getBoard()[index]) {
            Game.playTurn(index);
            render();
    }});
});

// Reset button
const resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", () => {
    Gameboard.resetBoard();
    Game.resetGame();
    Game.gameResult.textContent = "";
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





