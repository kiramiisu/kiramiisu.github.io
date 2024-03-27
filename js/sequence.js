// tutorial used: https://freshman.tech/simon-game/

let sequence = [];
let humanSequence = [];
let level = 0;

const startButton = document.querySelector(".js-start");
const info = document.querySelector(".js-info");
const heading = document.querySelector(".js-heading");
const tileContainer = document.querySelector(".js-container");

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add("activated");
  sound.play();

  setTimeout(() => {
    tile.classList.remove("activated");
  }, 300);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}

function nextStep() {
  const tiles = ["red", "green", "blue", "yellow"];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

function nextRound() {
  // increase the level
  level += 1;

  // disable clicking on the tiles
  tileContainer.classList.add("unclickable");
  info.textContent = "Match this...";
  heading.textContent = `Level ${level} of 3`;

  // copy all the elements in the `sequence` array to `nextSequence`
  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 1000);
}

function handleClick(tile) {
  const index = humanSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = sequence.length - humanSequence.length;

  if (humanSequence[index] !== sequence[index]) {
    finishGame("Oops!", "Game over, you pressed the wrong tile");
    return;
  }

  if (humanSequence.length === sequence.length) {
    if (humanSequence.length === 3) {
      finishGame("Congrats!", "You completed all the levels");
      return;
    }

    humanSequence = [];
    info.textContent = "Good job! Next round!";
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `Your turn: ${remainingTaps} Tap${
    remainingTaps > 1 ? "s" : ""
  }`;
}

function startGame() {
  startButton.classList.add("hidden");
  info.classList.remove("hidden");
  info.textContent = "Match this...";
  nextRound();
}

// reset the game if the player makes a mistake
function resetGame() {
  sequence = [];
  humanSequence = [];
  level = 0;

  startButton.classList.remove("hidden");
  heading.textContent = "Sequence Game";
  info.classList.add("hidden");
  tileContainer.classList.add("unclickable");
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

// let player click the tiles
function humanTurn(level) {
  tileContainer.classList.remove("unclickable");
  info.textContent = `Your turn: ${level} Tap${level > 1 ? "s" : ""}`;
}

// start game button
startButton.addEventListener("click", startGame);

// detect the player’s button taps and decide whether to
// move to the next round or end the game
tileContainer.addEventListener("click", (event) => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
});
