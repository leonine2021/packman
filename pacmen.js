let pos = 0;
const pacArray = [
  ["./images/PacMan1.png", "./images/PacMan2.png"],
  ["./images/PacMan3.png", "./images/PacMan4.png"],
];
let direction = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  let imgState = Math.round(Math.random());

  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = pacArray[imgState][0];
  newimg.width = 100;

  // TODO: set position here
  newimg.style.top = position.y;
  newimg.style.left = position.x;

  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    imgState,
    newimg,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

let counter = 0;
function mouthMove() {
  pacMen.forEach((item) => {
    if (counter % 2 == 0) {
      item.newimg.src = pacArray[item.imgState][0];
    } else {
      item.newimg.src = pacArray[item.imgState][1];
    }
  });
  counter += 1;
  setTimeout(mouthMove, 500);
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    changeDirectionIfNecessary(item);
    item.velocity.x = -1 * item.velocity.x;
  }

  if (
    item.position.y + item.velocity.y + item.newimg.height >
      window.innerHeight ||
    item.position.y + item.velocity.y < 0
  )
    item.velocity.y = -1 * item.velocity.y;
}

function changeDirectionIfNecessary(pacman) {
  if (pacman.velocity.x > 0 && pacman.imgState == 0) {
    pacman.imgState = 1;
  } else if (pacman.velocity.x < 0 && pacman.imgState == 1) {
    pacman.imgState = 0;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== "undefined") {
  module.exports = { checkCollisions, update, pacMen };
}
