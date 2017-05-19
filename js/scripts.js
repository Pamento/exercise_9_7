var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('kamień'); });
pickPaper.addEventListener('click', function() { playerPick('papier'); });
pickScissors.addEventListener('click', function() { playerPick('nożyce'); });

var gameState = 'notStarted',
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');
    victoryComputer = document.getElementById('js-computerWinn');
    victoryPlayer = document.getElementById('js-playerWinn');

function setGameElements() {
    switch(gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            victoryComputer.style.display = 'none';
            victoryPlayer.style.display = 'none';
            break;
        case 'endedPlayer':
            newGameBtn.innerText = 'Jeszcze raz';
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
            victoryComputer.style.display = 'none';
            victoryPlayer.style.display = 'block';
            break;
        case 'endedComputer':
            newGameBtn.innerText = 'Jeszcze raz';
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
            victoryComputer.style.display = 'block';
            victoryPlayer.style.display = 'none';
            break;
        case 'notStarted':
            default:
                newGameElem.style.display = 'block';
                pickElem.style.display = 'none';
                resultsElem.style.display = 'none';
                victoryComputer.style.display = 'none';
                victoryPlayer.style.display = 'none';
  }
}
setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
    player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');

    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();

        playerNameElem.innerHTML = player.name;
        setGamePoints();
  }
}
function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

function getComputerPick() {
    var possiblePicks = ['kamień', 'papier', 'nożyce'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = gameArbiter(playerPick, computerPick)
    scoreRoundWinner(winnerIs);
    setGamePoints();
    endGame();
}

function gameArbiter(playerPick, computerPick){
    if (playerPick === computerPick) {
        return 'noone';
    } else if (
        (computerPick === 'kamień' &&  playerPick === 'nożyce') ||
        (computerPick === 'nożyce' &&  playerPick === 'papier') ||
        (computerPick === 'papier' &&  playerPick === 'kamień')) {
        return 'computer';
    } else {
       return 'player';
    }


}

function scoreRoundWinner(winnerIs) {

    if (winnerIs === 'player') {
        playerResultElem.innerHTML = "Wygrana!";
        player.score++;
    } else if (winnerIs === 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
    } else {
        playerResultElem.innerHTML = "remis";
        computerResultElem.innerHTML = "remis";
    }
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function endGame() {
    if (player.score === 10) {
        gameState = 'endedPlayer';
    } else if (computer.score === 10) {
        gameState = 'endedComputer';
    }
    setGameElements();
}
