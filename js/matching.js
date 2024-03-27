// tutorial used: https://www.youtube.com/watch?v=ZniVgo8U7ek

const cards = document.querySelectorAll(".memory-card");

let modal = document.querySelector(".modal-sequence");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let flippedPairs = 0;

function revealCards() {
  cards.forEach((card) => {
    card.classList.add("flip");
  });
  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove("flip");
    });
  }, 2000);
}

function flipCard() {
  // lockboard prevents from clicking on more than two cards
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  // do cards match?
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  flippedPairs++;

  if (flippedPairs === 4) {
    setTimeout(() => {
      finishGame("Congrats!", "You completed all the levels");
      return;
    }, 1500);
  }

  resetBoard();
}

document.querySelector(".play-again-button").addEventListener("click", () => {
  document.querySelector(".modal-sequence").style.display = "none";
  document.querySelector(".overlay").style.display = "none";
  resetGame();
});

document.querySelector(".back-home-button").addEventListener("click", () => {
  window.location.href = "index.html";
});

// game end modal
function finishGame(h2, p) {
  document.querySelector(".modal-sequence").style.display = "flex";
  document.querySelector(".overlay").style.display = "block";
  document.querySelector(".modal-sequence > h2").innerHTML = h2;
  document.querySelector(".modal-sequence > p").innerHTML = p;
}

function resetGame() {
  flippedPairs = 0;
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
  setTimeout(() => {
    shuffle();
    revealCards();
  }, 1000);
}

function unflipCards() {
  lockBoard = true;
  // not a match
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    lockBoard = false;
    resetBoard();
  }, 1500);
}

function resetBoard() {
  // for double click bug
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  images = [
    "star",
    "star",
    "heart",
    "heart",
    "flower",
    "flower",
    "cloud",
    "cloud",
  ];

  let i = images.length;
  let j = 1;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    cards[i].dataset.image = images[j];
    cards[i].childNodes[1].src = `./img/${images[j]}.svg`;
    images.splice(j, 1);
  }
}

shuffle();
setTimeout(() => {
  revealCards();
}, 1000);

cards.forEach((card) => card.addEventListener("click", flipCard));
