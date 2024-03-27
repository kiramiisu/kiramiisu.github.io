// tutorial used: https://www.youtube.com/watch?v=sD3Os4H_EOU

let rows = 3;
let columns = 3;

var currTile;
var otherTile; // blank tile

let turns = 0;

let imgOrder = ["1", "3", "2", "4", "5", "6", "7", "8", "9"];
// let imgOrder = ["4", "2", "5", "1", "3", "9", "7", "8", "6"];

window.onload = function () {
  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      // creating the img tags
      // <img id="0-0" src="1.jpg">
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = "img/" + imgOrder[count++] + ".jpg";

      // Drag and drop tiles functionality
      tile.addEventListener("dragstart", dragStart); // click an image to drag
      tile.addEventListener("dragover", dragOver); // moving image around while clicked
      tile.addEventListener("dragenter", dragEnter); // dragging an image over another
      tile.addEventListener("dragleave", dragLeave); // dragging an image away from another
      tile.addEventListener("drop", dragDrop); // dragging an image onto another and dropping it
      tile.addEventListener("dragend", dragEnd); // after dropping the image, swap the two tiles

      document.getElementById("board").append(tile);
    }
  }
};

function dragStart() {
  currTile = this; // this refers to the image tile being dragged
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this; // this refers to the image tile being dropped on
}

function dragEnd() {
  if (!otherTile.src.includes("3.jpg")) {
    return;
  }
  // swaping the two tiles
  let currCoords = currTile.id.split("-"); // ex "0-0" -> ["0", "0"]
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  // check for adjacency
  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;
  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
  }

  const board = document.getElementById("board");
  let count = 1;
  for (const child of board.children) {
    if (!child.src.endsWith(`img/${count++}.jpg`)) {
      return;
    }
  }
  // prevent the user from moving the tiles
  board.style.pointerEvents = "none";
  document.querySelector(".completed-puzzle").style.display = "block";

  // delay
  setTimeout(() => {
    finishGame("Congrats!", "You completed all the levels");
    board.style.pointerEvents = "auto";

    resetPuzzle();
  }, 1500);
}

document.querySelector(".play-again-button").addEventListener("click", () => {
  document.querySelector(".modal-sequence").style.display = "none";
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".completed-puzzle").style.display = "none";
  turns = 0;
  document.getElementById("turns").innerText = 0;
});

function resetPuzzle() {
  let count = 0;
  for (const child of board.children) {
    child.src = "img/" + imgOrder[count++] + ".jpg";
  }
}

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
