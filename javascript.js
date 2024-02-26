function Player(name){
    const shape = null;

    return {
        name, shape
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
    }

    return {
        playGame
    }

})();


Game.playGame()