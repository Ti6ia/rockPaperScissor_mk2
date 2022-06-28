const content = document.getElementById('content'); 

const renderHeader = () =>{
    const logo = document.createElement('div');
    logo.classList.add('centerInline', 'logo');
    logo.innerText = 'Rock Paper Scissor';
    content.appendChild(logo);
}

const renderFooter = () => {
    const footer = document.createElement('div');
    footer.classList.add('footer');
    footer.innerText = 'Copyright Andrea Nichele @Ti6ia';
    content.appendChild(footer);
}

const renderSelectRounds = () => {
    const howManyRounds = document.createElement('div');
    howManyRounds.classList.add('centerInline', 'howManyRounds');
    howManyRounds.innerText = 'Select how many rounds do you want to play';
    
    const buttons = document.createElement('div');
    buttons.classList.add('centerInline', 'buttons');

    const three = document.createElement('div');
    three.classList.add('button', 'three');
    const five = document.createElement('div');
    five.classList.add('button', 'five');
    const ten = document.createElement('div');
    ten.classList.add('button', 'ten');

    buttons.appendChild(three);
    buttons.appendChild(five);
    buttons.appendChild(ten);
    content.appendChild(howManyRounds);
    content.appendChild(buttons);
}

const renderGame = (() => {
    //buttons
    const buttons = document.createElement('div');
    buttons.classList.add('centerInline', 'buttons');

    const rock = document.createElement('div');
    rock.classList.add('button', 'rock');
    const paper = document.createElement('div');
    paper.classList.add('button', 'paper');
    const scissor = document.createElement('div');
    scissor.classList.add('button', 'scissor');

    //scoreboard
    const scoreboard = document.createElement('div');
    scoreboard.classList.add('scoreboard');

    const scoreboardHeadingYOU = document.createElement('div');
    scoreboardHeadingYOU.classList.add('centerInline', 'scoreboardHeadings');
    scoreboardHeadingYOU.innerText = "YOU";
    const scoreboardHeadingCPU = document.createElement('div');
    scoreboardHeadingCPU.classList.add('centerInline', 'scoreboardHeadings');
    scoreboardHeadingCPU.innerText = "CPU";
    const yourScores = document.createElement('div');
    yourScores.setAttribute('id', 'yourscores');
    yourScores.classList.add('scores');
    const cpusscores = document.createElement('div');
    cpusscores.setAttribute('id', 'cpusscores');
    cpusscores.classList.add('scores');

    const renderScoreboard = () => {
        let you, cpu;
        for(let i = 0; i < scoreboard.getScores().length; i++){
            if(scoreboard.getScores()[i][2] == 'You Won!'){
                you = divMaker(['winner', `${scoreboard.getScores()[i][0]}`]);
                cpu = divMaker(['loser', `${scoreboard.getScores()[i][1]}`]);
            }else{
                you = divMaker(['loser', `${scoreboard.getScores()[i][0]}`]);
                cpu = divMaker(['winner', `${scoreboard.getScores()[i][1]}`]);
            }
            yourScores.appendChild(you);
            cpusscores.appendChild(cpu);
        }
    }

    const renderLayout = () => {
        //append buttons
        buttons.appendChild(rock);
        buttons.appendChild(paper);
        buttons.appendChild(scissor);
        content.appendChild(buttons);

        //append scoreboard
        scoreboard.appendChild(scoreboardHeadingYOU);
        scoreboard.appendChild(scoreboardHeadingCPU);
        scoreboard.appendChild(yourScores);
        scoreboard.appendChild(cpusscores);
        content.appendChild(scoreboard);
    }
    

    return {renderLayout, renderScoreboard}
})();

let playerSelection = "nulla";
const setEventListeners = () => {
    const rock = document.querySelector('.rock');
    const paper = document.querySelector('.paper');
    const scissor = document.querySelector('.scissor');

    rock.addEventListener('click', () => {
        playerSelection = 'rock';
        playRound(playerSelection);
        renderGame.renderScoreboard();
    });
    paper.addEventListener('click', () => {
        playerSelection = 'paper';
        playRound(playerSelection);
        renderGame.renderScoreboard();
    });
    scissor.addEventListener('click', () => {
        playerSelection = 'scissor';
        playRound(playerSelection);
        renderGame.renderScoreboard();
    });
}

const divMaker = (classe, content) => {
    let div = document.createElement('div');
    for(let i = 0; i < classe.length; i++){
        div.classList.add(`${classe[i]}`);
    }
    if(content != undefined){
        div.innerText = content;
    }
    return div;
}

//SCOREBOARD
const scoreboard = (() => {
    let scores = [];
    
    const getScores = () => {
        return scores;
    }

    const addScore = (resultPlayRound/*array*/) => {
        scores.push(resultPlayRound);
    }

    const resetScoreboard = () => {
        scores = [];
    }

    return {addScore, getScores, resetScoreboard};
})();


const computerPlay = () => {
    let x = Math.floor(Math.random()*(3-1+1))+1;
    if(x == 1){
        x = "rock";
    }else if(x == 2){
        x = "paper";
    }else if(x == 3){
        x = "scissor";
    }else{
        console.log("qualcosa non va in computerPlay");
    }
    return x;
}

function playRound(playerSelection){
    console.log("Player: " + playerSelection);
    computerSelection = computerPlay();
    console.log("PC: " + computerSelection);
    let result;
    if(playerSelection === "rock" && computerSelection === "paper"){
        result = "You Lost!";
    }else if(playerSelection === "paper" && computerSelection === "rock"){
        result = "You Won!";
    }else if(playerSelection === "paper" && computerSelection === "scissor"){
        result = "You Lost!"; 
    }else if(playerSelection === "scissor" && computerSelection === "paper"){
        result = "You Won!";
    }else if(playerSelection === "scissor" && computerSelection === "rock"){
        result = "You Lost!";
    }else if(playerSelection === "rock" && computerSelection === "scissor"){
        result = "You Won!";
    }else if(playerSelection === "rock" && computerSelection === "rock"){
        result = "Equal";
    }else if(playerSelection === "paper" && computerSelection === "paper"){
        result = "Equal";
    }else if(playerSelection === "scissor" && computerSelection === "scissor"){
        result = "Equal";
    }else{
        return "C'è qualche problema in playRound";
    }
    scoreboard.addScore([playerSelection, computerSelection, result]);
}

renderHeader();
// renderSelectRounds();
renderGame.renderLayout();
setEventListeners();
renderFooter();