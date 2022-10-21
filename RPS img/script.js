const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const winText = document.getElementById("winText");
const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");
const gameOverText = document.getElementById("gameOverText");
const reload = document.getElementById("link-reload");
const historyTable = document.getElementById("history");
let playerScoreValue = 0;
let computerScoreValue = 0;
let tableRowCount = 1;

const controller = new AbortController();

const options = ["rock", "paper", "scissors"];

computerPlay = () => {
    let n = Math.floor(Math.random() * options.length);
    return options[n];
}

/* getUserSelection = () => {
    let input = prompt("Enter rock, paper or scissors").toLowerCase();
    if(input == "scissor"){
        input = "scissors";
        return input;
    }
    if (input == "rock" || input == "paper" || input == "scissors"){
        return input;
    }
    else{
        getUserSelection();
    }
} */

playRound = (computerSelection, playerSelection) => {
    if(computerSelection == playerSelection){
        winText.innerHTML = "Its a tie.";
    }
    else if(computerSelection == "rock" && playerSelection == "paper"){
        winText.innerHTML = `You win! <span style = "font-style: italic">${playerSelection} beats ${computerSelection}.</span>`;
        playerScoreValue++;
    }
    else if(computerSelection == "paper" && playerSelection == "scissors"){
        winText.innerHTML = `You win! <span style = "font-style: italic">${playerSelection} beats ${computerSelection}.</span>`;
        playerScoreValue++;
    }
    else if(computerSelection == "scissors" && playerSelection == "rock"){
        winText.innerHTML = `You win! <span style = "font-style: italic">${playerSelection} beats ${computerSelection}.</span>`;
        playerScoreValue++;
    }
    else{
        winText.innerHTML = `You Lose! <span style = "font-style: italic">${computerSelection} beats ${playerSelection}.<span>`;
    computerScoreValue++;
    }
    playerScore.value = playerScoreValue;
    computerScore.value = computerScoreValue;
    let tableRow = historyTable.insertRow(tableRowCount);
    let moveCount = tableRow.insertCell(0);
    let playerHistory = tableRow.insertCell(1);
    let computerHistory = tableRow.insertCell(2);
    moveCount.textContent = tableRowCount++;
    playerHistory.textContent = playerSelection;
    computerHistory.textContent = computerSelection;
    if(playerScoreValue  == 5 || computerScoreValue ==5){
        gameOverText.innerHTML = `Game Over! <span style = "font-weight: bold">${playerScoreValue == 5 ? 'You' : 'Computer'}</span> won. <br /><span id="link-reload" onClick = "location.reload()">Reload</span> to play again`;
        controller.abort();
    }
}

rock.addEventListener('click', () => {
    playRound(computerPlay(), 'rock');
}, {signal: controller.signal});

paper.addEventListener('click', () => {
    playRound(computerPlay(), 'paper');
}, {signal: controller.signal});

scissors.addEventListener('click', () => {
    playRound(computerPlay(), 'scissors');
}, {signal: controller.signal});

/* game = () => {
    for(let i = 0; i < 5; i++){
        let computerSelection = computerPlay();
        let playerSelection = getUserSelection();
        playRound(computerSelection, playerSelection);
    }
} */