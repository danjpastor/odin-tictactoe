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
    }

    return {
        printBoard
    }
}

const Game = (function () {
    let activePlayer = null;
    let winner = null;
    let gameOver = false;

    const createPlayers = function (playerOneName, playerTwoName) {
        const playerOne = Player(playerOneName)
        const playerTwo = Player(playerTwoName)
        playerOne.shape = "X";
        playerTwo.shape = "O";

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
        console.log(activePlayer.name)
        return activePlayer.name
    }

    const playGame = function () {
        // const playerOneName = prompt("What is the name of Player One?");
        // const playerTwoName = prompt("What is Player Two's Name")
        let players = createPlayers("Bob", "Linda");
        console.log(`Welcome ${players[0].name} and ${players[1].name}`)

        let gameboard = Gameboard()
        console.log(gameboard.printBoard())
        changePlayer(players)
    }

    return {
        playGame
    }

})();


Game.playGame()