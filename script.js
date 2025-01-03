// select elements
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const goalScreen = document.getElementById('goalScreen');
const losingScreen = document.getElementById('losingScreen')
const startButton = document.getElementById('startButton');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const timeLimit = 180;

const spawnpoint = { x: 16, y: 10}

const ball = { x: spawnpoint.x, y: spawnpoint.y, radius: 6, vx: 0, vy: 0 };

const goal = { x: 465, y: 466, radius: 10};

//array of all walls
const walls = [
    { x: 0, y: 0, width: 4, height: 480 }, // left wall of canvas
    { x: 0, y: 0, width: 480, height: 1 }, // upper wall of canvas
    { x: 476, y: 0, width: 4, height: 480 }, // right wall of canvas
    { x: 0, y: 476, width: 480, height: 4 }, // lower wall of canvas
    //walls in the labyrinth
    { x: 30, y: 1, width: 480, height: 4 },
    { x: 30, y: 34, width: 60, height: 2 },
    { x: 30, y: 34, width: 2, height: 30 },
    { x: 30, y: 64, width: 30, height: 2 },
    { x: 30, y: 94, width: 2, height: 302 },
    { x: 0, y: 394, width: 30, height: 2 },
    { x: 30, y: 424, width: 30, height: 2 },
    { x: 30, y: 454, width: 60, height: 2 },
    { x: 60, y: 64, width: 2, height: 240 },
    { x: 60, y: 334, width: 2, height: 92 },
    { x: 60, y: 154, width: 150, height: 2 },
    { x: 60, y: 244, width: 60, height: 2 },
    { x: 60, y: 304, width: 30, height: 2 },
    { x: 60, y: 394, width: 60, height: 2 },
    { x: 90, y: 34, width: 2, height: 60 },
    { x: 90, y: 124, width: 2, height: 32 },
    { x: 90, y: 184, width: 2, height: 30 },
    { x: 90, y: 304, width: 2, height: 60 },
    { x: 90, y: 424, width: 2, height: 60 },
    { x: 90, y: 94, width: 60, height: 2 },
    { x: 90, y: 184, width: 90, height: 2 },
    { x: 90, y: 274, width: 60, height: 2 },
    { x: 90, y: 364, width: 30, height: 2 },
    { x: 120, y: 4, width: 2, height: 60 },
    { x: 120, y: 214, width: 2, height: 32 },
    { x: 120, y: 274, width: 2, height: 60 },
    { x: 120, y: 364, width: 2, height: 60 },
    { x: 120, y: 64, width: 120, height: 2 },
    { x: 120, y: 124, width: 120, height: 2 },
    { x: 120, y: 214, width: 30, height: 2 },
    { x: 120, y: 334, width: 30, height: 2 },
    { x: 120, y: 424, width: 120, height: 2 },
    { x: 120, y: 454, width: 60, height: 2 },
    { x: 150, y: 94, width: 2, height: 30 },
    { x: 150, y: 244, width: 2, height: 32 },
    { x: 150, y: 334, width: 2, height: 60 },
    { x: 150, y: 34, width: 30, height: 2 },
    { x: 150, y: 244, width: 30, height: 2 },
    { x: 150, y: 304, width: 30, height: 2 },
    { x: 150, y: 364, width: 30, height: 2 },
    { x: 150, y: 394, width: 60, height: 2 },
    { x: 180, y: 4, width: 2, height: 32 },
    { x: 180, y: 64, width: 2, height: 30 },
    { x: 180, y: 184, width: 2, height: 90 },
    { x: 180, y: 304, width: 2, height: 30 },
    { x: 180, y: 424, width: 2, height: 32 },
    { x: 180, y: 274, width: 90, height: 2 },
    { x: 180, y: 334, width: 30, height: 2 },
    { x: 210, y: 94, width: 2, height: 32 },
    { x: 210, y: 154, width: 2, height: 90 },
    { x: 210, y: 334, width: 2, height: 62 },
    { x: 210, y: 454, width: 2, height: 30 },
    { x: 210, y: 34, width: 60, height: 2 },
    { x: 210, y: 184, width: 90, height: 2 },
    { x: 210, y: 244, width: 30, height: 2 },
    { x: 210, y: 304, width: 120, height: 2 },
    { x: 240, y: 34, width: 2, height: 60 },
    { x: 240, y: 154, width: 2, height: 30 },
    { x: 240, y: 304, width: 2, height: 150 },
    { x: 240, y: 94, width: 30, height: 2 },
    { x: 240, y: 154, width: 30, height: 2 },
    { x: 240, y: 214, width: 30, height: 2 },
    { x: 240, y: 364, width: 30, height: 2 },
    { x: 270, y: 94, width: 2, height: 62 },
    { x: 270, y: 214, width: 2, height: 62 },
    { x: 270, y: 364, width: 2, height: 30 },
    { x: 270, y: 424, width: 2, height: 30 },
    { x: 270, y: 64, width: 60, height: 2 },
    { x: 270, y: 244, width: 60, height: 2 },
    { x: 270, y: 334, width: 30, height: 2 },
    { x: 270, y: 424, width: 30, height: 2 },
    { x: 300, y: 34, width: 2, height: 180 },
    { x: 300, y: 274, width: 2, height: 30 },
    { x: 300, y: 334, width: 2, height: 120 },
    { x: 300, y: 364, width: 90, height: 2 },
    { x: 300, y: 454, width: 30, height: 2 },
    { x: 330, y: 4, width: 2, height: 30 },
    { x: 330, y: 94, width: 2, height: 32 },
    { x: 330, y: 154, width: 2, height: 120 },
    { x: 330, y: 304, width: 2, height: 30 },
    { x: 330, y: 394, width: 2, height: 30 },
    { x: 330, y: 454, width: 2, height: 30 },
    { x: 330, y: 34, width: 30, height: 2 },
    { x: 330, y: 94, width: 150, height: 2 },
    { x: 330, y: 154, width: 30, height: 2 },
    { x: 330, y: 394, width: 30, height: 2 },
    { x: 330, y: 424, width: 30, height: 2 },
    { x: 360, y: 34, width: 2, height: 30 },
    { x: 360, y: 124, width: 2, height: 32 },
    { x: 360, y: 184, width: 2, height: 150 },
    { x: 360, y: 424, width: 2, height: 30 },
    { x: 360, y: 124, width: 60, height: 2 },
    { x: 360, y: 214, width: 30, height: 2 },
    { x: 360, y: 334, width: 30, height: 2 },
    { x: 360, y: 454, width: 30, height: 2 },
    { x: 390, y: 34, width: 2, height: 60 },
    { x: 390, y: 124, width: 2, height: 92 },
    { x: 390, y: 244, width: 2, height: 62 },
    { x: 390, y: 334, width: 2, height: 32 },
    { x: 390, y: 394, width: 2, height: 62 },
    { x: 390, y: 34, width: 30, height: 2 },
    { x: 390, y: 244, width: 60, height: 2 },
    { x: 390, y: 304, width: 30, height: 2 },
    { x: 390, y: 394, width: 90, height: 2 },
    { x: 420, y: 4, width: 2, height: 32 },
    { x: 420, y: 154, width: 2, height: 92 },
    { x: 420, y: 304, width: 2, height: 92 },
    { x: 420, y: 424, width: 2, height: 32 },
    { x: 420, y: 64, width: 60, height: 2 },
    { x: 420, y: 274, width: 60, height: 2 },
    { x: 420, y: 334, width: 30, height: 2 },
    { x: 420, y: 424, width: 60, height: 2 },
    { x: 420, y: 454, width: 60, height: 2 },
    { x: 450, y: 34, width: 2, height: 32 },
    { x: 450, y: 124, width: 2, height: 92 },
    { x: 450, y: 304, width: 2, height: 32 },
    { x: 450, y: 34, width: 30, height: 2 },
    { x: 450, y: 124, width: 30, height: 2 },
    { x: 450, y: 214, width: 30, height: 2 },
    { x: 450, y: 364, width: 30, height: 2 },
];

let allCoinsCollected = false

//array of all coins in the labyrinth
const coins = [
    {x: 136, y: 20, radius: 7, collected: false},
    {x: 346, y: 20, radius: 7, collected: false},
    {x: 46, y: 80, radius: 7, collected: false},
    {x: 136, y: 110, radius: 7, collected: false},
    {x: 436, y: 110, radius: 7, collected: false},
    {x:76, y: 140, radius: 7, collected: false},
    {x:346, y: 140, radius: 7, collected: false},
    {x:76, y: 230, radius: 7, collected: false},
    {x:226, y: 230, radius: 7, collected: false},
    {x:166, y: 260, radius: 7, collected: false},
    {x:406, y: 260, radius: 7, collected: false},
    {x:76, y: 350, radius: 7, collected: false},
    {x:376, y: 350, radius: 7, collected: false},
    {x: 16, y: 382, radius: 7, collected: false},
    {x: 256, y: 382, radius: 7, collected: false},
    {x: 376, y: 410, radius: 7, collected: false},
    {x: 436, y: 410, radius: 7, collected: false},
    {x: 76, y: 467, radius: 7, collected: false},
    {x: 106, y: 467, radius: 7, collected: false}
];

//array of all traps in the labyrinth
const traps = [
    {x: 406, y: 20, radius: 11},
    {x: 226, y: 50, radius: 11},
    {x: 465, y: 110, radius: 11},
    {x: 226, y: 170, radius: 11},
    {x: 76, y: 380, radius: 11},
    {x: 346, y: 410, radius: 11},
    {x: 465, y: 410, radius: 11},
    {x: 376, y: 440, radius: 11},
    {x: 286, y: 465, radius: 11},
];

function drawWalls(ctx) {
    ctx.fillStyle = "black";
    walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}

function drawCoins(ctx) {
    coins.forEach(coin => {
        if (!coin.collected) {
            //draw black outline
            ctx.beginPath();
            ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.closePath();

            //draw golden filling
            ctx.beginPath();
            ctx.arc(coin.x, coin.y, coin.radius - 2, 0, Math.PI * 2);
            ctx.fillStyle = "gold";
            ctx.fill();
            ctx.closePath();

            //draw black line in middle
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.moveTo(coin.x, coin.y - (coin.radius - 4)); //
            ctx.lineTo(coin.x, coin.y + (coin.radius - 4)); //
            ctx.stroke();
            ctx.closePath();
        }
    });
}

function drawTraps(ctx) {
    traps.forEach(trap => {
        //draw black outline
        ctx.beginPath();
        ctx.arc(trap.x, trap.y, trap.radius, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        //purple filling
        ctx.beginPath();
        ctx.arc(trap.x, trap.y, trap.radius - 2, 0, Math.PI * 2);
        ctx.fillStyle = "#6B3FA0";
        ctx.fill();
        ctx.closePath();
    })
}

//draw the goal green if all coins got collected, otherwise black and therefore invisible
function drawGoal(ctx) {
    ctx.beginPath();
    ctx.arc(goal.x, goal.y, goal.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#00F700";
    ctx.fill();
    ctx.closePath();
}

//draw the red ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function handleKeyPress(e) {
    let dx = 0, dy = 0;
    const speed = 8;

    if (e.key === "ArrowUp") dy = -speed;
    if (e.key === "ArrowDown") dy = speed;
    if (e.key === "ArrowLeft") dx = -speed;
    if (e.key === "ArrowRight") dx = speed;

    updateBallPosition(ball, dx, dy)
}
// Simulate movement with arrow keys
window.addEventListener('keydown', handleKeyPress);

//function to check whether ball and wall collide
function checkWallCollision(ball, wall) {
    return (
        ball.x + ball.radius >= wall.x &&
        ball.x - ball.radius <= wall.x + wall.width &&
        ball.y + ball.radius >= wall.y &&
        ball.y - ball.radius <= wall.y + wall.height
    );
}

//updates the coinCounter
function updateCoinCount() {
    let coinCountElement = document.getElementById("coinCounter");
    let counter = 0;
    //count every coin not collected yet
    coins.forEach(coin => {
        if (coin.collected == false) {
            counter++;
        }
    })
    //if all coins are collected set allCoinsCollected true and draw the goal
    if (counter == 0) {
        allCoinsCollected = true;
        drawGoal(ctx);
    }
    //update counter in document
    coinCountElement.innerHTML = counter
}


//check if new ball position is colliding with a wall
function checkCoinCollision(ball) {
    coins.forEach(coin => {
        //check the distance for every coin
        if (!coin.collected) {
            const distX = ball.x - coin.x;
            const distY = ball.y - coin.y;
            const distance = Math.sqrt(distX * distX + distY * distY);

            //if ball touches coin, set collected to true and update the coin-count
            if (distance < ball.radius + coin.radius) {
                coin.collected = true;
                updateCoinCount();
            }
        }
    });
}

//check if the ball falls into a trap
function checkTrapCollision(ball, trap) {
    const distX = ball.x - trap.x;
    const distY = ball.y - trap.y;
    const distance = Math.sqrt(distX * distX + distY * distY);

    return (distance <= trap.radius);
}

//check if the ball touches the goal
function checkGoalCollision() {
    const distX = ball.x - goal.x;
    const distY = ball.y - goal.y;
    const distance = Math.sqrt(distX * distX + distY * distY);

    return (distance <= goal.radius);
}

//updates ball position depending on input and position
function updateBallPosition(ball, dx, dy ) {
    const newX = ball.x + dx;
    const newY = ball.y + dy;

    let collisionX = false;
    let collisionY = false;

    //Iterate over all walls to check for collision
    for (const wall of walls) {
        //check if moving along x-axis is blocked by wall
        if (checkWallCollision({ x: newX, y: ball.y, radius: ball.radius }, wall)) {
            collisionX = true;
        }
        //check if moving along y-axis is blocked by wall
        if (checkWallCollision({ x: ball.x, y: newY, radius: ball.radius }, wall)) {
            collisionY = true;
        }

        // Breche die Schleife ab, wenn beide Kollisionen erkannt wurden
        if (collisionX && collisionY) {
            break;
        }
    }

    // Bewege den Ball nur, wenn keine Kollision erkannt wurde
    if (!collisionX) {
        ball.x = newX;
    }
    if (!collisionY) {
        ball.y = newY;
    }

    //check if ball fell into a trap
    traps.forEach(trap => {
        if (checkTrapCollision(ball, trap)) {
            ball.x = spawnpoint.x;
            ball.y = spawnpoint.y;
        }
    })

    //if all coins are collected and ball touches goal, then change screen to goalScreen
    if (allCoinsCollected) {
        if (checkGoalCollision()) {
            gameScreen.classList.remove('visible');
            goalScreen.classList.add('visible');
            document.getElementById("gameScreen").style.display = "none";
            document.getElementById("goalScreen").style.display = "flex";
        }
    }
}

let vx = 0, vy = 0;
//take inputs from accelerometer and calculate new position of the ball
function handleMotion(event) {
    //read-only x and y values of the accelerometer
    const ax = event.accelerationIncludingGravity.x;
    const ay = event.accelerationIncludingGravity.y;
    //Low-Pass-Filter
    vx = vx * 0.8 + ax * 0.2
    vy = vy * 0.8 + ay * 0.2

    updateBallPosition(ball, vx * 0.5, vy * -0.5)
}

window.addEventListener('keyup', () => {
    ball.vx = 0;
    ball.vy = 0;
});

function gameLoop() {
    //update canvas by deleting and redrawing the elements
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWalls(ctx);
    checkCoinCollision(ball);
    drawCoins(ctx);
    drawTraps(ctx);
    if (allCoinsCollected) {
        drawGoal(ctx);
    }
    drawBall();

    requestAnimationFrame(gameLoop); // Animations-Loop
}



let timer = timeLimit; //seconds
//function starts timer and counts down the seconds
function startTimer() {
    const interval = setInterval(() => {
        if (isRunning) {
            timer--;
            let timerElement = document.getElementById("timer");
            timerElement.innerHTML = timer;
            //if time is over, display alert
            if (timer <= 0) {
            clearInterval(interval);
            window.removeEventListener("devicemotion", handleMotion);
            window.removeEventListener('keydown', handleKeyPress);
            gameScreen.classList.remove('visible');
            losingScreen.classList.add('visible');
            document.getElementById("gameScreen").style.display = "none";
            document.getElementById("losingScreen").style.display = "flex";
            }
        }
    }, 1000);
}

// changes screen to labyrinth, starts eventlistener for accelerometer and starts game
startButton.onclick = function(e) {
    e.preventDefault();

    //change screen from startScreen to gameScreen
    startScreen.classList.remove('visible');
    gameScreen.classList.add('visible');
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "flex";

    //Ask for permission for iOS 13+ devices
    if ( 
        DeviceMotionEvent 
        && typeof DeviceMotionEvent.requestPermission === "function"
    ) {
        DeviceMotionEvent.requestPermission();
    }
    //add event-listener for accelerometer, start timer and game
    window.addEventListener("devicemotion", handleMotion);
    startTimer();
    gameLoop();
}


let isRunning = true;
let playPauseButton = document.getElementById("playPauseButton");
playPauseButton.onclick = function(e) {
    e.preventDefault();

    if (isRunning) {
        //if game is running, remove event-listeners to prevent movement of the ball, change wording of button and set isRunning to false
        window.removeEventListener("devicemotion", handleMotion);
        window.removeEventListener('keydown', handleKeyPress);
        playPauseButton.innerHTML = "Weiter";
        isRunning = false;
    } else {
        //otherwise, add event-listeners to enable movement of the ball, change wording of the button and set isRunning to true
        window.addEventListener("devicemotion", handleMotion);
        window.addEventListener('keydown', handleKeyPress);
        playPauseButton.innerHTML = "Pause";
        isRunning = true;
    }
}

// adjust size of game objects according to canvas size
function adjustGameObjects() {
    //calculate factor depending on canvas width
    const adjustingFactor = (canvas.width / 480)
    walls.forEach(wall => {
        //update x- and y-coordinates for each wall according to factor
        wall.x = wall.x * adjustingFactor;
        wall.y = wall.y * adjustingFactor;
        //update width or height for each wall according to factor, depending on whether wall is placed horizontally or vertically
        if (wall.width == 2) {
            wall.height = wall.height * adjustingFactor;
        } else if (wall.height == 2) {
            wall.width = wall.width * adjustingFactor;
        }
    });

    //update x-, y-coordinates and radius for each coin according to factor
    coins.forEach(coin => {
        coin.x = coin.x * adjustingFactor;
        coin.y = coin.y * adjustingFactor;
        coin.radius = coin.radius * adjustingFactor;
    });

    //update x-, y-coordinates and radius for each trap according to factor
    traps.forEach(trap => {
        trap.x = trap.x * adjustingFactor;
        trap.y = trap.y * adjustingFactor;
        trap.radius = trap.radius * adjustingFactor;
    })

    //update x-, y-coordinates and radius for the goal according to factor
    goal.x = goal.x * adjustingFactor;
    goal.y = goal.y * adjustingFactor;
    goal.radius = goal.radius * adjustingFactor;

    //update x-, y-coordinates and radius for the ball according to factor
    ball.x = spawnpoint.x * adjustingFactor;
    ball.y = spawnpoint.y * adjustingFactor;
}

// Set canvas size to match screen size
function resizeCanvas() {
    if (window.innerWidth < 480) {
        canvas.width = window.innerWidth - 10 ;
        canvas.height = canvas.width;

        //adjust size of gameobjects
        adjustGameObjects();
    }
}

resizeCanvas();

document.getElementById('level2Button').addEventListener('click', () => {
    window.location.href = './level_2/level2.html'; // Weiter zu Level 2
});

document.getElementById('restartButton').addEventListener('click'), () => {
    ball.x = spawnpoint.x;
    ball.y = spawnpoint.y;

    allCoinsCollected = false;
    coins.forEach(coin => {
        coin.collected = false;
    })
    updateCoinCount();

    window.addEventListener("devicemotion", handleMotion);
    window.addEventListener('keydown', handleKeyPress);

    losingScreen.classList.remove('visible');
    gameScreen.classList.add('visible');
    document.getElementById("losingScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "flex";

    timer = timeLimit;
    startTimer();
}