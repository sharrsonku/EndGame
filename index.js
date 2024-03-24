const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector(".result");

let currentPlayerIndex = 260;
const width = 17;
const removeAliens = [];
let aliensId;
let isGoingRight = true;
let direction = 1;
let result = 0;
let gameInProgress = true;
let countDownTimer;


// invaders maken
for (let i = 0; i < width * width; i++) {
    const squares = document.createElement("div")
    grid.appendChild(squares);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

// wie wordt een alien
const aliens = [
    0,1,2,3,4,5,6,7,8,9,10,11,12,
    17,18,19,20,21,22,23,24,25,26,27,28,29,
    34,35,36,37,38,39,40,41,42,43,44,45,46
];

function draw() {
    for (let i = 0; i < aliens.length; i++) {
        if (!removeAliens.includes(i)) {
            squares[aliens[i]].classList.add("alien");

        }
    }
}
draw();

squares[currentPlayerIndex].classList.add("player");

function remove(){
    for (let i = 0; i < aliens.length; i++){
        squares[aliens[i]].classList.remove("alien");
    }
}
function movePlayer(e){
    squares[currentPlayerIndex].classList.remove("player");
    switch(e.key){
        case "ArrowLeft":
            if(currentPlayerIndex % width !==0) currentPlayerIndex -=1
            break;
            case "ArrowRight":
            if ((currentPlayerIndex + 1) % width !== 0) currentPlayerIndex += 1;
            break;
    }
    squares[currentPlayerIndex].classList.add("player");
}
document.addEventListener("keydown", movePlayer);


function moveAliens(){
    if (!gameInProgress)return;
    const leftEdge = aliens[0] % width === 0;
    const rightEdge = aliens[aliens.length - 1] % width === width -1;
    remove();

if (rightEdge && isGoingRight) {
for (let i = 0; i < aliens.length; i++) {
    aliens[i] += width + 1;
    direction = -1;
    isGoingRight = false;
}
}
if (leftEdge &&!isGoingRight) {
    for (let i = 0; i < aliens.length; i++) {
        aliens[i] += width - 1;
        direction = 1;
        isGoingRight = true;
    }
}

for (let i = 0; i < aliens.length; i++){
    aliens[i] += direction;
}

draw();

    if (result >= 10) {
        clearInterval(aliensId);
        aliensId = setInterval(moveAliens, 300); 
    }

    if (result >= 15) {
        clearInterval(aliensId);
        aliensId = setInterval(moveAliens, 500); 
    }
if (aliens.includes(currentPlayerIndex)) {
    resultDisplay.innerHTML = "GAME OVER";
    clearInterval(aliensId);
    gameInProgress = false;  

}

if (removeAliens.length === aliens.length){
    resultDisplay.innerHTML = "YOU WIN";
    clearInterval(aliensId);
    gameInProgress = false;;
}
}
aliensId = setInterval(moveAliens, 400); 

//shoot
function shoot(e) {
    if (!gameInProgress) return;

    let laserId;
    let currentLaserIndex = currentPlayerIndex;


function moveLaser() {
    squares[currentLaserIndex].classList.remove("laser");

    if (squares[currentLaserIndex - width]) {
        squares[currentLaserIndex - width].classList.remove("laser");
    }

    currentLaserIndex -= width;

    if (currentLaserIndex < 0) {
        clearInterval(laserId);
        return;
    }

    squares[currentLaserIndex].classList.add("laser");


    if (squares[currentLaserIndex].classList.contains("alien")) {
        const laserMp3 = document.getElementById("laserMp3");
        laserMp3.play();
        squares[currentLaserIndex].classList.remove("laser", "alien");
        squares[currentLaserIndex].classList.add("explosion");

        setTimeout(() => squares[currentLaserIndex].classList.remove("explosion"), 100);

        const alienIndex = aliens.indexOf(currentLaserIndex);
        removeAliens.push(alienIndex);
        result++;
        resultDisplay.innerHTML = result;

        clearInterval(laserId);

    }
}

if (e.key === "ArrowUp") {
   laserId = setInterval(moveLaser, 100);
   
}
}

document.addEventListener("keydown", shoot)




// gemaakt met behulp van https://www.youtube.com/watch?v=s6LrpUTQQn0
