/*
Variable set-up
*/

// card setup variables
let allCardClasses = [
	'fa-diamond', 'fa-diamond',
	'fa-paper-plane-o', 'fa-paper-plane-o',
	'fa-anchor', 'fa-anchor',
	'fa-bolt', 'fa-bolt',
	'fa-cube', 'fa-cube',
	'fa-bomb', 'fa-bomb',
	'fa-leaf', 'fa-leaf',
	'fa-bicycle', 'fa-bicycle'
];
let deck = document.querySelector('.deck');
// Moves Counter variables
let movesCount = 0;
let countDisplay = document.getElementById('move-counter');
const ratingStars = document.querySelector('.stars');
let eachStar = ratingStars.children;
let totalStars = 3;
// game mechanics' variables
let openedCards = [];
let matchedCards = [];
let firstMove = 0;
// timer variables
let timerCounter = document.getElementById('timeCounter');
let minDisplay = document.getElementById('minutes');
let secDisplay = document.getElementById('seconds');
let min = 0;
let sec = 0;
// restart game variables
const restartButton = document.querySelector('#restart-btn');
const restartButton2 = document.querySelector('#play-again-btn');
// win screen variables
const winScreen = document.querySelector('.win-screen');
let winText = document.querySelector('#win-text');

/*
Event Listeners set-up
*/
// initial game set up on page load
document.addEventListener("DOMContentLoaded", gameInit);
//open cards and start timer when a card is clicked
deck.addEventListener('click', openCards);
// restart game when pressing the restart button
restartButton.addEventListener('click', gameInit);
restartButton.addEventListener('click', resetTimer);
restartButton2.addEventListener('click', gameInit);
restartButton2.addEventListener('click', resetTimer);


/*
Functions 
*/
function gameInit () {
	// hide winScreen
	winScreen.setAttribute ('style', 'display: none;');
	// reset everything but time 
	resetRating();
	deck.innerHTML = '';
	openedCards = [];
	matchedCards = [];
	movesCount = 0;
	sec = 0;
	min = 0;
	totalStars = 3;
	// set timer 
	secDisplay.innerHTML = '00';
	minDisplay.innerHTML = '00';
	deck.addEventListener('click', timer);
	// shuffle cards
	let shuffledClasses = shuffle(allCardClasses);
	// reset counter on screen
	countDisplay.textContent = movesCount;
	// fill the deck
	for (const shuffledCard of shuffledClasses) {
	    // create cards to insert in empty deck
        let card = document.createElement('li');
        // append and style a card to the deck
        deck.appendChild(card);
        card.classList.add('card');
        // create and append symbols to cards
        let cardSymbol = document.createElement('i');
        card.appendChild(cardSymbol);
        // add shuffled classes to the symbol elements
        cardSymbol.classList.add('fa', shuffledCard);
    }
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function timer () {
	// remove eventListener so it won't go off everytime a card is clicked
	deck.removeEventListener('click', timer);
	timerInterval = setInterval (function (){
		// check the seconds
		if (sec < 59) {
			sec++;
		} else {
			sec = 0;
			min++;
		}	
		// update seconds and minutes label
		secDisplay.innerHTML = addZeroTimer(sec);
		minDisplay.innerHTML = addZeroTimer(min);
	}, 1000); 
}

function resetTimer () {
	clearInterval(timerInterval);
	sec = 0;
	min = 0;
	// update seconds and minutes label
	secDisplay.innerHTML = addZeroTimer(sec);
	minDisplay.innerHTML = addZeroTimer(min);
}

// add 0 if needed to the displayed timer (01:09 instead of 1:9)
function addZeroTimer (val) {
	// convert integers to string, to measure their lenght
	let valString = val.toString();
	// if .lenght is less than two, it means the number is in the single digits
	if (valString.length < 2) {
		return "0" + valString;
	} else {
		return valString;
	}
}

function openCards (e) {
	// only run if click is on a card AND if second click isn't on an already opened card
	if ((e.target.nodeName === 'LI') && (e.target.classList.contains('card')) && (!e.target.classList.contains('open'))) {
		// only run if there are less than two cards on openedCards[] to prevent users click several cards at the same time
		if (openedCards.length < 2) {
			// show the card by adding .show .open classes 
			e.target.classList.add('show', 'open');
			// add opened card to openCards [] array
			openedCards.push(e.target);
			// test on console
			// console.log('openedCards[]:');
			// console.log(openedCards);
			// remove cards from list if user opens 2
			if (openedCards.length === 2) {
				// compare cards
				compareCards();
			}
		}
	} 
}

function compareCards() {
	// console.log('Running compareCards()');
	if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
		// console.log('Cards are the same!');
		// add 1 move to the count
		addCount();
		// match the cards
		matchCards();
	} else {
		// console.log ('Cards are not the same!');
		// wait  0.7 seconds so both cards appear opened for that amount of time before being closed.
		setTimeout(closeCards, 700);
		// add 1 move to the count
		addCount();
	}
	
}

function matchCards () {
	// console.log('Running matchCards()');
	// give the cards the .match class
	for (openedCard of openedCards) {
		// add the class to the elements on the openedCard[] list
		openedCard.classList.remove('show','open');
		openedCard.classList.add('match');
		// add cards to matchedCards[] list -- NOT YET DONE
		matchedCards.push(openedCard);
	}
	// remove cards from openedCards[] list
	openedCards.splice(0, 2);
	// check if won
	if (matchedCards.length == 16) {
		// player wins
		youWin();
	}
	// test on console
	// console.log('openedCards[]:');
	// console.log(openedCards);
	// console.log('matchedCards[]:');
	// console.log(matchedCards);
}

function closeCards () {
	// test on console
	// console.log('running closeCards()');
	for (openedCard of openedCards) {
		// close cards
		openedCard.classList.remove('show','open');
	}
	// remove cards from the openedCards[] array (up to 4 cards in case there are more)
	openedCards.splice(0, 2);	
	// test on console
	// console.log('openedCards[]:');
	// console.log(openedCards);
}

function addCount () {
	// increase count by 1
	movesCount++;
	// console.log('Move count: ' + movesCount);
	// display on screen
	countDisplay.textContent = movesCount;
	// update player rating
	checkRating();
}

function checkRating () {
	// when movesCount gets to 12, take a star. When it gets to 20, take another
	if (movesCount == 13) {
		eachStar[0].remove();
		totalStars--;
	} else if  (movesCount == 19) {
		eachStar[1].remove()
		totalStars--;
	}
}

function resetRating () {
	// empty stars (if any)
	ratingStars.innerHTML = '';
	// place the stars
	for (let stNum = 0; stNum < 3; stNum++) {
		// create star items
		let stItem = document.createElement('li');
		let stSymbol = document.createElement('i');
		// append star items to .stars <ul>
		ratingStars.appendChild(stItem);
		stItem.appendChild(stSymbol);
		// style star items
		stItem.classList.add('fa', 'fa-star');
	}
}


function youWin () {
	// take out interval
	clearInterval(timerInterval);
	// show message
	// winScreen.setAttribute ('style', 'display: block;');
	winScreen.style.display = 'block';
	// update message content
	winText.innerText =  `Congratulations, you've won!

	Your time : ${addZeroTimer(min)} : ${addZeroTimer(sec)}
	Number of moves : ${movesCount}

	That gives you ${totalStars} / 3 stars!`;
}




