function Player(name){
    const shape = null;

    return {
        name, shape
    }
}

function Gameboard() {
    let board = Array(9).fill('');
    const winningCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [1, 4, 7],
        [0, 3, 6],
        [2, 5, 8]
    ];

    const printBoard = function () {
        console.log(board)
    };

    const getBoard = function () {
        return board;
    };

    const getWinningCondition = function () {
        return winningCondition;
    }

    const resetBoard = function () {
        board = Array(9).fill('');
    }


    return {
        printBoard,
        getBoard,
        getWinningCondition,
        resetBoard
    }
}

function visualController(players, gameboard) {
    const scoreboard = document.querySelector('#scoreboard')
    const playerOneScore = document.querySelector('.playerOneScore')
    const playerTwoScore = document.querySelector('.playerTwoScore')
    
    let score = [0, 0];

    const updateScore = function (players) {
        let winner = Game.getWinner()

        if (!winner) {
            console.log(score)
        } else if (winner.name == players[0].name) {
            score[0] += 1
            console.log(score)
        } else if (winner.name == players[1].name) {
            score[1] += 1
            console.log(score)
        }
        
        playerOneScore.querySelector(".score").textContent = score[0]
        playerTwoScore.querySelector(".score").textContent = score[1]
    }

    const displayPlayers = function (players) {
        const playerOneName = document.querySelector(".playerOneName");
        const playerTwoName = document.querySelector(".playerTwoName");

        playerOneName.querySelector('h2').textContent = players[0].name
        playerTwoName.querySelector('h2').textContent = players[1].name
    }

    return {
        updateScore,
        displayPlayers
    }
}

const Game = (function () {
    let activePlayer = null;
    let winner = null;
    let gameOver = false;

    const gameboardDiv = document.querySelector('#gameboard');
    const reset = document.querySelector("button")

    const createPlayers = function (playerOneName, playerTwoName) {

        if (!playerOneName) {
            playerOneName = "Mr. X"
        }
        if (!playerTwoName) {
            playerTwoName = "Ms. O"
        }

        const playerOne = Player(playerOneName)
        const playerTwo = Player(playerTwoName)
        playerOne.shape = "X";
        playerTwo.shape = "O";

        activePlayer = playerOne;
        console.log(`It is ${getActivePlayer()}'s Turn`)

        return [playerOne, playerTwo];
    }

    const changePlayer = function (players) {
        if (activePlayer == players[0]) {
            activePlayer = players[1];
        } else if (activePlayer == players[1]) {
            activePlayer = players[0];
        } else {
            activePlayer = players[0];
        }
        console.log(`It is time for ${activePlayer.name}'s Move!`)

    }

    const getActivePlayer = function () {
        return activePlayer.name
    }

    const getActivePlayerShape = function () {
        return activePlayer.shape;
    };

    const updateCell = function(index, players, gameboard, visuals) {
        // Check if the cell is already filled
        if (!gameboardDiv.children[index].textContent.trim() && gameOver == false) {
            // Get the active player's shape and update the cell
            const playerShape = Game.getActivePlayerShape();
            gameboardDiv.children[index].textContent = playerShape;
            gameboard.getBoard()[index] = playerShape
            gameboard.printBoard()

            changePlayer(players)
            checkWinner(players, gameboard, visuals) 
        }
    };

    const newGame = function (players, gameboard, visuals) {

        console.clear()
        winner = null;

        gameboard.resetBoard()
        gameboard.printBoard()
        gameboardDiv.textContent = '';
        activePlayer = players[0]
        createBoard(players, gameboard, visuals)
        gameOver = false;
    }

    const checkWinner = function(players, gameboard, visuals) {
        const board = gameboard.getBoard();
        for (let condition of gameboard.getWinningCondition()) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                // If the values are the same and not empty, we have a winner
                winner = board[a] === players[0].shape ? players[0] : players[1];
                gameOver = true;
                console.log(`Congratulations! ${winner.name} wins!`);
                visuals.updateScore(players)
            }
        }
        // Check for tie
        if (!board.includes('') && !winner) {
            gameOver = true;
            console.log("It's a tie!");
        }
        return winner;
    }
    
    const createBoard = function (players, gameboard, visuals) {

        for (i = 0; i < 9; i++){
            const cell = document.createElement('div');
            cell.className = `cell ${i+1}`
            gameboardDiv.appendChild(cell)
        }

        const cells = document.querySelectorAll('.cell')

        for (i = 0; i < cells.length; i ++){
            cells[i].index = i+1;

            cells.forEach((cell, index) => {
                cell.addEventListener('click', function (event) {
                    // Call a function to update the cell with player's shape
                    updateCell(index, players, gameboard, visuals); // Pass index as an argument
                });
            });
        };

    }

    const playGame = function () {
        // const playerOneName = prompt("What is the name of Player One?", "Mr. X");
        // const playerTwoName = prompt("What is Player Two's Name", "Ms. O")
        let playerOneName = null;
        let playerTwoName = null;
        
        let players = createPlayers(playerOneName, playerTwoName);
        console.log(`Welcome ${players[0].name} and ${players[1].name}`)

        let gameboard = Gameboard()
        let visuals = visualController(players, gameboard)
        cells = createBoard(players, gameboard, visuals)
        visuals.displayPlayers(players)

        reset.addEventListener('click', function(e) {
            newGame(players, gameboard, visuals)
        })
    }

    const getWinner = function () {
        return winner
    }

    return {
        playGame,
        getActivePlayerShape,
        createPlayers,
        updateCell,
        changePlayer,
        createBoard,
        checkWinner,
        newGame,
        getWinner
    }

})();

Game.playGame()