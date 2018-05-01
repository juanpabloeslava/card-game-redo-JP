// initial game set up on page load
 document.addEventListener("DOMContentLoaded", gameInit);
/*
 * Create a list that holds all of your cards
 */
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
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function gameInit () {
	// reset rating system
	resetRating();
	// erase everything currently in deck, as well as in the lists, and the move counter
	deck.innerHTML = '';
	openedCards = [];
	matchedCards = [];
	movesCount = 0;
	// shuffle cards
	let shuffledClasses = shuffle(allCardClasses);
	// reset counter on screen
	countDisplay.textContent = movesCount;
	// fill the deck
	for (const shuffledCard of shuffledClasses) {
	    // create cards to insert in empty deck
        let card = document.createElement('li');
        // appends a card to the deck
        deck.appendChild(card);
        // add card classes to created and appended cards
        // card.classList.add('card', 'show', 'open');    // to visualy test the cards on the screen
        card.classList.add('card');
        // create symbols to put in the cards
        let cardSymbol = document.createElement('i');
        // appends symbol element to cards
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

// restart game when pressing the restart button
const restartButton = document.getElementById('restart-btn');
restartButton.addEventListener('click', gameInit);

//open cards and start timer when a card is clicked
deck.addEventListener('click', openCards);
deck.addEventListener('click', runTimer);

let openedCards = [];
let matchedCards = [];

// timer variables
let timerCounter = document.getElementById('timeCounter');
let minDisplay = document.getElementById('minutes');
let secDisplay = document.getElementById('seconds');
let min = 0;
let sec = 0;

function runTimer() {
	console.log('running timer');
	// take out the event listener for the timer, so it doesn't run again everytime you click on a card
	deck.removeEventListener('click', runTimer);
	// setInterval function (every second loop)
	Interval = setInterval(function() {
		++sec;
		// update seconds label
		secDisplay.innerHTML = addZeroTimer(sec % 60);
		// update minutes label
		// Keine Ahnung why parseInt works, but that's what my dad recommended, and it does work, so I'll just let that pass. Life's too short.
		minDisplay.innerHTML = addZeroTimer(parseInt(sec / 60));
	}, 1000);
}

// add 0 if needed to the displayed timer (01:09 instead of 1:9)
function addZeroTimer (val) {
	// convert integers to string, to measure their lenght
	var valString = val.toString();
	// if .lenght is less than two, it means the number is in the single digits
	if (valString.length < 2) {
		return "0" + valString;
	} else {
		return valString;
	}
};

/*
function runTimer() {
	console.log('running timer');
	// take out the event listener for the timer, so it doesn't run again everytime you click on a card
	deck.removeEventListener('click', runTimer);
	// setInterval function (every second loop)
	Interval = setInterval(function() {
		sec++
		if (sec <= 9) {
			// display as 01-09, instead of just 0-9
            seconds.innerHTML = "0" + sec; 
        } else if (sec == 59) {
        	// go back to 0 each time a minute passes
            sec = 0;
            // setTimeout only once every minute
            setTimeout (function() {
                min++;
                minutes.innerHTML = min;
            }, 1);
        } else { 
            seconds.innerHTML = sec;
        }
	}, 1000);
}
*/

function openCards (e) {
	// only run if click is on a card
	if ((e.target.nodeName === 'LI') && (e.target.classList.contains('card'))) {
		// only run if there are less than two cards on openedCards[] to prevent users click several cards at the same time
		if (openedCards.length < 2) {
			// show the card by adding .show .open classes 
			e.target.classList.add('show', 'open');
			// add opened card to openCards [] array
			openedCards.push(e.target);
			// test on console
			console.log('openedCards[]:');
			console.log(openedCards);
			// remove cards from list if user opens 2
			if (openedCards.length === 2) {
				// compare cards
				compareCards();
			}
		}
	} else {
		console.log('Did not click on card');
	}
}

function compareCards() {
	console.log('Running compareCards()');
	if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
		console.log('Cards are the same!');
		// match the cards
		matchCards();
		// add 1 move to the count
		addCount();
	} else {
		console.log ('Cards are not the same!');
		// wait  0.7 seconds so both cards appear opened for that amount of time before being closed.
		setTimeout(closeCards, 700);
		// add 1 move to the count
		addCount();
	}
	
}

function matchCards () {
	console.log('Running matchCards()');
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
	// test on console
	console.log('openedCards[]:');
	console.log(openedCards);
	console.log('matchedCards[]:');
	console.log(matchedCards);
}

function closeCards () {
	// test on console
	console.log('running closeCards()');
	for (openedCard of openedCards) {
		// close cards
		openedCard.classList.remove('show','open');
	}
	// remove cards from the openedCards[] array (up to 4 cards in case there are more)
	openedCards.splice(0, 2);	
	// test on console
	console.log('openedCards[]:');
	console.log(openedCards);
}

// Moves Counter
let movesCount = 0;
let countDisplay = document.getElementById('move-counter');
const ratingStars = document.querySelector('.stars');
let eachStar = ratingStars.children;

function addCount () {
	// increase count by 1
	movesCount++;
	console.log('Move count: ' + movesCount);
	// display on screen
	countDisplay.textContent = movesCount;
	// update player rating
	checkRating();
}

function checkRating () {
	// when movesCount gets to 12, take a star. When it gets to 20, take another
	if (movesCount == 12) {
		eachStar[0].remove();
	} else if  (movesCount == 20) {
		eachStar[1].remove()
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
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



