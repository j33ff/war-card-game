/*----- constants -----*/

class Card {
    constructor(value, suit) {
      this.value = value;
      this.suit = suit;
      this.imgClass = "card " + this.suit + " " + this.value;
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


// index 0 is computers selection and 1 is players card
const currentPlayerCards = ["",""];

const globalDeck = [];

// stores each card that is currently in play
const cardsInplay = [];

// cards that the computer has been dealt
const computerDeck = [];

// cards that the player has been dealt
const playerDeck = [];

let gameStatusMessage = "";

/*----- cached element references -----*/


/*----- event listeners -----*/

dealCardsBtn.addEventListener("click", function(e){
    currentPlayerCardDiv.classList.add('.card.diamonds.A');
    console.log(e);
})

/*----- functions -----*/

const buildDeck = function(){
    suits.forEach(function(suit){
        values.forEach(function(value){
            let card = new Card(value, suit);
            globalDeck.push(card);
        })
    }) 
}
   


const shuffleCards = function(){
    // function to shuffle cards
}

const dealCards = function(){
    for(let i = 0; i < globalDeck.length; i++){
        if(globalDeck.length < 27){
            computerDeck.push(globalDeck[i]);
        } else {
            playerDeck.push(globalDeck[i]);
        }
    }
}

const compareCards = function(playerCardObject, computerCardObject){
    // find the values and rank them based on which has a higher index value
    // from values array
    let playerCardRank = values.findIndex(playerCardObject.value);
    let computerCardRank = values.findIndex(computerCardObject.value);

    if (playerCardRank === computerCardRank) {
        gameStatus.textContent = "It's war!";

    }

}

console.log(computerDeck);
console.log(playerDeck);

const init = function(){
    buildDeck();
    dealCards();

}