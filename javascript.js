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
    let turn = 0;
    let winner = null;
    let gameOver = false;


    const createPlayers = function (playerOneName, playerTwoName) {
        const playerOne = Player(playerOneName)
        const playerTwo = Player(playerTwoName)
        playerOne.shape = "X";
        playerTwo.shape = "O";

        return [playerOne, playerTwo];
    }

    const playGame = function () {
        // const playerOneName = prompt("What is the name of Player One?");
        // const playerTwoName = prompt("What is Player Two's Name")
        let players = createPlayers("Bob", "Linda");
        console.log(`Welcome ${players[0].name} and ${players[1].name}`)

        let gameboard = Gameboard()
        console.log(gameboard.printBoard())
    }

    return {
        playGame
    }

})();


Game.playGame()