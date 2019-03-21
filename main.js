const numberOfGuesses = 6;
let remainingNumberOfGuesses = numberOfGuesses;
const playAgainMessage = 'Play again'
const upperBound = 10;
let winningNumber;

let userInput = document.querySelector('.game__input');
let btnAction = document.getElementById("action");
let gameContainer = document.querySelector(".game");
let gameHeading = document.querySelector(".game__heading");

addClickListeners();
setUpGame();

function addClickListeners(){
    btnAction.addEventListener('click', handleAction);
    gameContainer.addEventListener('keypress', handleAction);
    gameHeading.addEventListener('click', moveElement);
}

function moveElement(e){
    e.target.classList.remove("move");
    void e.target.offsetWidth;
    e.target.classList.add("move");
    
}

function setUpGame(){
    userInput.disabled = false;
    btnAction.textContent = 'Enter';
    winningNumber = generateRandomNumberBetween1And(upperBound);
    remainingNumberOfGuesses = numberOfGuesses;
    displayInstructions(upperBound);
    displayFeedback(`You have ${numberOfGuesses} guesses`);
}


function handleAction(e) {
    if (e.type !== 'click' && e.code !== 'Enter') return;
    if (btnAction.textContent.includes(playAgainMessage)){
        setUpGame();
    }
    else {
        handleUserInput();
    }
}

function handleUserInput() {
    let userGuess = parseInt(userInput.value);
    let gameFeedback;

    if (userGuess === winningNumber){
        gameFeedback = `You win! ${userGuess} was correct!`
        endGame();
    }

    else {
        remainingNumberOfGuesses --;
        let guessesSingularOrPlural = getSingularOrPluralFormOfGuesses(remainingNumberOfGuesses);
        gameFeedback = `${userGuess} is incorrect. You have ${remainingNumberOfGuesses} ${guessesSingularOrPlural} left`;
    }

    if (remainingNumberOfGuesses < 1){
        gameFeedback = 'You lose';
        endGame();
    }
    
    userInput.value = '';
    displayFeedback(gameFeedback);
}

function getSingularOrPluralFormOfGuesses(remainingNumberOfGuesses){
    return (remainingNumberOfGuesses === 1) ? 'guess' : 'guesses';
}

function endGame(){
    userInput.disabled = true;
    btnAction.textContent = 'Play again';
}

function displayInstructions(upperBound){
    let gameInstructions = document.querySelector('.game__instructions');
    gameInstructions.textContent = `Guess a number between 1 and ${upperBound}`
}

function displayFeedback(message){
    let gameFeedback = document.querySelector('.game__feedback');
    gameFeedback.textContent = message;
}

function generateRandomNumberBetween1And(upperBound){
    return Math.floor(Math.random()*upperBound + 1);
}