// DISPLAY CONTROLLER
const displayController = (() =>{
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

    const renderGame = () => {
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

        return scoreboard;
    }

    const setEventListeners = () => {
        const rock = document.querySelector('.rock');
        const paper = document.querySelector('.paper');
        const scissor = document.querySelector('.scissor');
    
        rock.addEventListener('click', () => { playerSelection = 'rock'; console.log("roccia"); });
        paper.addEventListener('click', () => { playerSelection = 'paper'; console.log("papera"); });
        scissor.addEventListener('click', () => { playerSelection = 'scissor'; console.log("cisoia"); });
    }

    // //diduwon -> true = you won / false = cpu won
    // const scoresMaker = (diduwon) => {
    //     let youScore = document.createElement('div');
    //     let cpuScore = document.createElement('div');
    //     if(diduwon == true){
    //         youScore.classList.add('roundWon');
    //         //aggiungi simolo giocato
    //         cpuScore.classList.add('roundLost');
    //         //aggiungi simolo giocato
    //     }else{
    //         youScore.classList.add('roundLost');
    //         //aggiungi simolo giocato
    //         cpuScore.classList.add('roundWon');
    //         //aggiungi simolo giocato
    //     }
    //     return {youScore, cpuScore}
    // }

    return {renderHeader, renderFooter, renderSelectRounds, renderGame, setEventListeners};
})();


//SCOREBOARD
class Scoreboard {
    constructor(){
        this.scoreboard = [];
    }
    getScoreboard(){
        return this.scoreboard;
    }
    setScoreboard(punteggio){
        this.scoreboard.push(punteggio);
    }
}


//GAME CONTROLLER
const gameController = (() => {

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

    function playRound(playerSelection, computerSelection){
        computerSelection = computerPlay();
        console.log("Player: " + playerSelection);
        document.getElementById("player").innerText = "Player: " + playerSelection;
        console.log("PC: " + computerSelection);
        document.getElementById("PC").innerText = "PC: " + computerSelection;
        if(playerSelection === "rock" && computerSelection === "paper"){
            return "You Lost!";
        }else if(playerSelection === "paper" && computerSelection === "rock"){
            return "You Won!";
        }else if(playerSelection === "paper" && computerSelection === "scissor"){
            return "You Lost!"; 
        }else if(playerSelection === "scissor" && computerSelection === "paper"){
            return "You Won!";
        }else if(playerSelection === "scissor" && computerSelection === "rock"){
            return "You Lost!";
        }else if(playerSelection === "rock" && computerSelection === "scissor"){
            return "You Won!";
        }else if(playerSelection === "rock" && computerSelection === "rock"){
            return "Equal";
        }else if(playerSelection === "paper" && computerSelection === "paper"){
            return "Equal";
        }else if(playerSelection === "scissor" && computerSelection === "scissor"){
            return "Equal";
        }else{
            return "C'è qualche problema in playRound";
        }
    }

    return {computerPlay, playRound};
})();



displayController.renderHeader();
// displayController.renderSelectRounds();
displayController.renderGame();
displayController.renderFooter();