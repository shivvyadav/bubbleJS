//selecting elements to display hit, timer, score
let hitBox = document.getElementById("hit");
let timerBox = document.getElementById("timer");
let scoreBox = document.getElementById("score");

//selecting bubble container
let bubbleContainer = document.getElementById("bubble-container");

let clutter = ""; //empty container
let score = 0; //initial score
let time = 60; //initial time

let highestScoreBox = document.getElementById("highestScore");

//getting highest score
let highestScore = getHighestScore();
highestScoreBox.innerText = highestScore;


//function to start game
let startBtn = document.getElementById("start"); //selecting start button
startBtn.addEventListener("click", () => {
  newHit();
  createBubble();
  runTimer();
});

//function to generate new hit
function newHit() {
  let random = Math.floor(Math.random() * 10);
  hitBox.innerText = random;
}

//function to create bubbles
function createBubble() {
  for (let i = 1; i < 161; i++) {
    let random = Math.floor(Math.random() * 10);
    clutter += `<div class="bubble">${random}</div>`;
  }
  bubbleContainer.innerHTML = clutter;
}

// event listener for click
bubbleContainer.addEventListener("click", (e) => {
  user = e.target.innerText;
  if (e.target.classList.contains("bubble")) {
    //if user clicks on correct bubble
    if (user == hitBox.innerText) {
      score += 10;
      scoreBox.innerText = score;
      newHit();
      clutter = ""; //empty container to create new bubbles
      //otherwise old bubbles will remain
      createBubble();
    } else {
      //if user clicks on wrong bubble
      score -= 5;
      scoreBox.innerText = score;
      hitBox.innerText = "";
      time = 0;
      gameOver();
    }
  }
});

//function to game over
function gameOver() {
  if (score > highestScore) {
    highestScore = score;
    setHighestScore();
    highestScoreBox.innerText = highestScore;
  }

  //creating game over screen
  clutter = `<div class='game'>
            <h1>Game Over</h1>
            <button class='play-again'>Play Again</button>
          </div>`;
  bubbleContainer.innerHTML = clutter;
  gameRestart(); //calling game restart function
}

//function to restart game
function gameRestart() {
  let restartBtn = document.querySelector(".play-again"); //selecting play again button
  restartBtn.addEventListener("click", function () {
    score = 0;
    scoreBox.innerText = score;
    time = 60;
    timerBox.innerText = time;
    newHit();
    clutter = ""; //empty container to create new bubbles otherwise old bubbles will remain
    createBubble();
    runTimer();   //calling run timer function
  });
}