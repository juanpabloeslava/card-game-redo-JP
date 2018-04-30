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
	// erase everything currently in deck
	deck.innerHTML = '';
	// shuffle cards
	let shuffledClasses = shuffle(allCardClasses);
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

//set up the event listener for a card.
deck.addEventListener('click', openCards);

let openedCards = [];

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
	} else {
		console.log ('Cards are not the same!');
		// wait  0.7 seconds so both cards appear opened for that amount of time before being closed.
		setTimeout(closeCards, 700);
	}
	
}

function matchCards () {
	console.log('Running matchCards()');
	// give the cards the .match class
	for (openedCard of openedCards) {
		// add the class to the elements on the openedCard[] list
		openedCard.classList.remove('show','open');
		openedCard.classList.add('match');
	}
	// remove cards from openedCards[] list
	openedCards.splice(0, 2);	
	// add cards to matchedCards[] list -- NOT YET DONE
}

function closeCards () {
	//test on console
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



