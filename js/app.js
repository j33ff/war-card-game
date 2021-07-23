/*----- constants -----*/

class Card {
    constructor(value, suit) {
      this.value = value;
      this.suit = suit;
    }
  }

const values = ["r02","r03","r04","r05","r06","r07","r08","r09","r10","J","Q","K","A"];

const suits = ["hearts","diamonds","clubs", "spades"];

const gameStatus = document.querySelector(".game-status");

const dealCardsBtn = document.querySelector(".deal-cards-btn");

const currentComputerCardDiv = document.querySelector(".computer-card");

const currentPlayerCardDiv = document.querySelector(".player-card");

const playerCardCount = document.querySelector(".player-count span");

const computerCardCount = document.querySelector(".computer-count span");



/*----- app's state (variables) -----*/


// index 0,1,2 is computers current classes and 3,4,5 is players card current classes
const currentCardClasses = [];

// the initial full deck of 52 cards
const globalDeck = [];

// the shuffled deck of 52 cards

const shuffledDeck = [];

// stores each card that is currently in play
const cardsInPlay = [];

// cards that the computer has been dealt
const computerDeck = [];

// cards that the player has been dealt
const playerDeck = [];

/*----- cached element references -----*/



/*----- event listeners -----*/

dealCardsBtn.addEventListener("click", function(e){
    
    //remove previous classLists from computer card div
    currentComputerCardDiv.classList.remove(currentCardClasses[0],currentCardClasses[1],currentCardClasses[2]);
    //remove previous classLists from player card div
    currentPlayerCardDiv.classList.remove(currentCardClasses[3], currentCardClasses[4],currentCardClasses[5]);
    
    // clear current card classes array for adding new classes
    currentCardClasses.splice(0,currentCardClasses.length);

    //add new classlist
    currentComputerCardDiv.classList.add("card",computerDeck[computerDeck.length-1].value,computerDeck[computerDeck.length-1].suit);
    currentCardClasses.push("card",computerDeck[computerDeck.length-1].value, computerDeck[computerDeck.length-1].suit);
    let currentComputerCard = computerDeck.pop();
    
    currentPlayerCardDiv.classList.add("card",playerDeck[playerDeck.length-1].value,playerDeck[playerDeck.length-1].suit);
    currentCardClasses.push("card",playerDeck[playerDeck.length-1].value, playerDeck[playerDeck.length-1].suit);
    let currentPlayerCard = playerDeck.pop();
    
    cardsInPlay.push(currentComputerCard, currentPlayerCard);
    compareCards(currentPlayerCard, currentComputerCard);
    
   
})

/*----- functions -----*/

// build the initial card deck using Card class constructor
const buildDeck = function(){
    suits.forEach(function(suit){
        values.forEach(function(value){
            let card = new Card(value, suit);
            globalDeck.push(card);
        })
    }) 
}

// function to shuffle cards
   
function shuffleCards(arr){
    shuffledDeck.splice(0, shuffledDeck.length);
    let newDeck = arr.sort((a, b) => 0.5 - Math.random());
    shuffledDeck.push(...newDeck);
}

// Deal 26 shuffled cards each to player and computer 

const dealCards = function(){
    for(let i = 0; i < shuffledDeck.length; i++){
        if (i < 26){
            computerDeck.push(shuffledDeck[i]);   
        } else {
            playerDeck.push(shuffledDeck[i]);  
        }
    }
}

function tied(){

    // remove previous classes 
    currentComputerCardDiv.classList.remove(currentCardClasses[0],currentCardClasses[1],currentCardClasses[2]);
    currentPlayerCardDiv.classList.remove(currentCardClasses[3],currentCardClasses[4], currentCardClasses[5]);
   

    currentCardClasses.splice(0, currentCardClasses.length);
    
    // deal one face down and one face up card each for player and computer
    let compDownCard = computerDeck.pop();
    let compUpCard = computerDeck.pop();
    currentComputerCardDiv.classList.add("card",compUpCard.value,compUpCard.suit);
    currentCardClasses.push("card",compUpCard.value,compUpCard.suit);
    
    let playDownCard = playerDeck.pop();
    let playUpCard = playerDeck.pop();
    currentPlayerCardDiv.classList.add("card",playUpCard.value,playUpCard.suit);
    currentCardClasses.push("card",playUpCard.value,playUpCard.suit);
    
    cardsInPlay.push(compUpCard,playUpCard,compDownCard,playDownCard);
    compareCards(playUpCard,compUpCard);

}

function compareCards(playerCardObject, computerCardObject){
    console.dir(cardsInPlay);
    // find the values and rank them based on which has a higher index value
    // from values array
    let playerCardRank = values.findIndex(value => value === playerCardObject.value);
    let computerCardRank = values.findIndex(value => value === computerCardObject.value);

    if (playerCardRank === computerCardRank) {
        gameStatus.textContent = "It's War!";

        // display that 4 new cards are being brought into play with a 2 second delay so user can see
        setTimeout(function(){
            gameStatus.textContent = "Drawing 4 new cards..."; 
            setTimeout(tied, 2000);
            
            }, 2000);
         
    } else if (playerDeck.length === 0){
        gameStatus.textContent = "Computer is the game champion!";
        computerDeck.unshift(...cardsInPlay);
        cardsInPlay.splice(0, cardsInPlay.length);
    } else if (computerDeck.length === 0){
        gameStatus.textContent = "Player is the game champion!";
        playerDeck.unshift(...cardsInPlay);
        cardsInPlay.splice(0, cardsInPlay.length);
    } else if (playerCardRank > computerCardRank){
        gameStatus.textContent = "Player wins this round!";
        playerDeck.unshift(...cardsInPlay);
        cardsInPlay.splice(0, cardsInPlay.length);
    } else { 
        gameStatus.textContent = "Computer wins this round!";
        computerDeck.unshift(...cardsInPlay);
        cardsInPlay.splice(0, cardsInPlay.length);
    } 

}

/*----- initialize the card deck -----*/

const init = function(){
    buildDeck();
    shuffleCards(globalDeck);
    dealCards();
}

init();

