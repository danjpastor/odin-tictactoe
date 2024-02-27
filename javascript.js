function Player(name){
    const shape = null;

    return {
        name, shape
    }
}

function Gameboard() {
    const board = ["", "", "","", "", "","", "", ""];
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


    return {
        printBoard,
        getBoard
    }
}

const visualController = (function () {
    const gameboardDiv = document.querySelector('#gameboard')
    let players = null; // Define players here
    
    const displayBoard = function () {
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
                    Game.updateCell(index, players); // Pass index as an argument
                });
            });
        };

    }

    return {
        displayBoard,
        setPlayers: function(p) { players = p; }
    }
})();

const Game = (function () {
    let activePlayer = null;
    let winner = null;
    let gameOver = false;

    const createPlayers = function (playerOneName, playerTwoName) {
        const playerOne = Player(playerOneName)
        const playerTwo = Player(playerTwoName)
        playerOne.shape = "X";
        playerTwo.shape = "O";

        activePlayer = playerOne;
        console.log(`It is ${getActivePlayer()}'s`)

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

    const updateCell = function(index, players) {
        // Check if the cell is already filled
        if (!gameboard.children[index].textContent.trim()) {
            // Get the active player's shape and update the cell
            const playerShape = Game.getActivePlayerShape();
            gameboard.children[index].textContent = playerShape;
            gameboard[index] = playerShape
            console.log(gameboard)

            
            changePlayer(players)

            
        }
    };

    const playGame = function () {
        // const playerOneName = prompt("What is the name of Player One?");
        // const playerTwoName = prompt("What is Player Two's Name")
        let players = createPlayers("Bob", "Linda");
        console.log(`Welcome ${players[0].name} and ${players[1].name}`)
        visualController.setPlayers(players)

        let gameboard = Gameboard()
        cells = visualController.displayBoard()
        console.log(gameboard.getBoard())
    }

    return {
        playGame,
        getActivePlayerShape,
        createPlayers,
        updateCell,
        changePlayer
    }

})();

Game.playGame()