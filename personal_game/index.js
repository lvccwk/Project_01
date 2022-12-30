const unitLength = 20;
const boxColor = 150;
let strokeColor = 200;
let columns; /* To be determined by window width */
let row; /* To be determined by window height */
let currentBoard;
let nextBoard;
let backgroundColor = 255;
let input1 = 2;
let fr = 30; //starting FPS

let gun = [
  [1, 5],
  [1, 6],
  [2, 5],
  [2, 6],
  [11, 5],
  [11, 6],
  [11, 7],
  [12, 4],
  [12, 8],
  [13, 3],
  [13, 9],
  [14, 3],
  [14, 9],
  [23, 6],
  [25, 1],
  [25, 2],
  [25, 6],
  [25, 7],
  [35, 3],
  [35, 4],
  [36, 3],
  [36, 4],
  [15, 6],
  [16, 4],
  [16, 8],
  [17, 5],
  [17, 6],
  [17, 7],
  [18, 6],
  [21, 3],
  [21, 4],
  [21, 5],
  [22, 3],
  [22, 4],
  [22, 5],
  [23, 2],
  [23, 6],
  [25, 1],
  [25, 2],
  [25, 6],
  [25, 7],
  [35, 3],
  [35, 4],
  [36, 3],
  [36, 4],
];

function setup() {
  /*event chagned and input*/

  /* frameRate() */
  frameRate(10);

  /* Set the canvas to be under the element #canvas*/
  const canvas = createCanvas(windowWidth - 300, windowHeight - 300);
  canvas.parent(document.querySelector("#canvas"));

  /*Calculate the number of columns and rows */
  columns = floor(width / unitLength);
  rows = floor(height / unitLength);

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [];
  nextBoard = [];

  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }
  // Now both currentBoard and nextBoard are array of array of undefined values.
  init(); // Set the initial values of the currentBoard and nextBoard
}

function windowResized() {
  //const canvasResize = resizeCanvas(windowWidth - 300, windowHeight - 300);
  //canvasResize.parent(document.querySelector("#canvas"));
  const canvasResize = resizeCanvas(windowWidth - 300, windowHeight - 300);
  canvasResize.parent(document.querySelector("#canvas"));
}

function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = 0;
      nextBoard[i][j] = 0;
    }
  }
}

function draw() {
  background(backgroundColor);
  generate();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (currentBoard[i][j] === 1 && backgroundColor == 255) {
        fill(255, random(255), random(255));
        //fill(180, 180, 180);
      } else if (currentBoard[i][j] == 1 && backgroundColor != 255) {
        fill("white");
      } else {
        fill(backgroundColor);
      }

      stroke(strokeColor);
      rect(i * unitLength, j * unitLength, unitLength, unitLength);
    }
  }
  let fr = Math.round(frameRate());
  textAlign(LEFT, TOP);
  if (backgroundColor == 255) {
    fill(51);
  } else {
    fill(255);
  }
  textSize(40);
  text("FPS: " + fr, 10, 90);
}

function generate() {
  //Loop over every single box on the board
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // Count all living members in the Moore neighborhood(8 boxes surrounding)
      let neighbors = 0;
      for (let i of [-1, 0, 1]) {
        for (let j of [-1, 0, 1]) {
          if (i == 0 && j == 0) {
            // the cell itself is not its own neighbor
            continue;
          }
          // The modulo operator is crucial for wrapping on the edge
          neighbors +=
            currentBoard[(x + j + columns) % columns][(y + i + rows) % rows];
          //neighbors += currentBoard[(x + i)(y + j)]
        }
      }

      // Rules of Life
      if (currentBoard[x][y] == 1 && neighbors < input1) {
        // Die of Loneliness

        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 1 && neighbors > 3) {
        // Die of Overpopulation
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 0 && neighbors == 3) {
        // New life due to Reproduction
        nextBoard[x][y] = 1;
      } else {
        // Stasis
        nextBoard[x][y] = currentBoard[x][y];
      }
    }
  }

  // Swap the nextBoard to be the current Board
  [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

function genGun() {
  init();
  frameRate(30);
  for (let i = 0; i < gun.length; i++) {
    currentBoard[gun[i][0]][gun[i][1]] = 1;

    fill(255, 255, 255);
    stroke(strokeColor);
    rect(
      [gun[i][0]] * unitLength,
      [gun[i][1]] * unitLength,
      unitLength,
      unitLength
    );
  }
}

/**
 * When mouse is dragged
 */
function mouseDragged() {
  /**
   * If the mouse coordinate is outside the board
   */
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }
  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);
  currentBoard[x][y] = 1;
  //fill(boxColor);
  fill(255, random(255), random(255));

  stroke(strokeColor);
  rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

function randomDragged() {
  for (let i = 0; i < 500; i++) {
    const x = Math.floor(Math.random() * columns);
    const y = Math.floor(Math.random() * rows);
    currentBoard[x][y] = 1;
    //fill(255, random(255), random(255));
    fill(255, 255, 255);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
  }
}

function keyTyped() {
  if (key === "a" || key === "A") {
    stopPressed();
  } else if (key === "b" || key === "B") {
    startReleased();
  } else if (key === "c" || key === "C") {
    init();
  } else if (key === "d" || key === "D") {
    darks();
  } else if (key === "e" || key === "E") {
    randomDragged();
  } else if (key === "f" || key === "F") {
    genGun();
    loop();
  } else if (key === "r") {
    Player();
    console.log(this.value);
  } else {
  }
}

/* best practice code - keyboard control 

switch (e.key) {
  case "w":
    someUpFunction()
  break
  case "s":
    someDownFunction()
  break
  case "Up":
  case "ArrowUp":
    someOtherUpFunction()
  break
  case "Down":
  case "ArrowDown":
    someOtherDownFunction()
  break
  case " ":
  case "Spacebar":
    someOtherFunction()
  break
  default:
    return
}

*/

/* When stop button is pressed */
function stopPressed() {
  noLoop();
}
/* */
/* When start button is pressed */
function startReleased() {
  loop();
}

/* When mouse is pressed*/
function mousePressed() {
  noLoop();
  mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
  loop();
}

document.querySelector("#reset-game").addEventListener("click", function () {
  init();
});

document.querySelector("#stop").addEventListener("click", function () {
  stopPressed();
});

document.querySelector("#start").addEventListener("click", function () {
  startReleased();
});

document.querySelector("#range-1").addEventListener("change", function (e) {
  frameRate(parseInt(e.target.value));
  console.log(this.value);
});

document.querySelector("#range-2").addEventListener("change", function (e) {
  // console.log(this.value);
  // input1 = this.value;
  input1 = parseInt(e.target.value);
});

document.querySelector("#random").addEventListener("click", function () {
  init();
  randomDragged();
});

document.querySelector("#gosper").addEventListener("click", function () {
  init();
  genGun();
});

document.querySelector("#darken").addEventListener("click", function () {
  if (backgroundColor == 255 && strokeColor == 200) {
    backgroundColor = 50;
    strokeColor = 20;
  } else {
    backgroundColor = 255;
    strokeColor = 200;
  }
  background(backgroundColor);
});

document.querySelector("#keyB").addEventListener("keypress", function () {
  console.log(this.value);
  keyPressed();
});

document.querySelector("#keyA").addEventListener("keypress", function () {
  console.log(this.value);
  keyPressedA();
});

document.querySelector("#random").addEventListener("click", function () {
  init();
  randomDragged();
});

function rangeSlideA(value) {
  document.getElementById("rangeValueA").innerHTML = value;
}

function rangeSlideB(value) {
  document.getElementById("rangeValueB").innerHTML = value;
}
