//select elements
const canvas = document.getElementById('level2Canvas');
const ctx = canvas.getContext('2d');
const gameScreen = document.getElementById('level2Screen');
const goalScreen = document.getElementById('goalScreen');
const losingScreen = document.getElementById('losingScreen');

const timeLimit = 180;

const spawnpoint = {x: 16, y: 226};

const ball = { x: spawnpoint.x, y: spawnpoint.y, radius: 6, vx: 0, vy: 0 };

const goal = { x: 286, y: 16, radius: 10 };

const ballButton = { x: 46, y: 437, radius: 10, pressed: false };

const platform = { 
    x: 211, 
    xStart: 211,
    xEnd: 300, 
    y: 241,
    xEnd: 300,
    width: 30, 
    height: 30, 
    speed: 0.4, 
    direction: 1,
    delay: 40
};

const portals = [
    { x: 465, y: 47, radius: 10, destX: 76, destY: 287 },
    { x: 106, y: 287, radius: 10, destX: 465, destY: 16 },
    { x: 226, y: 317, radius: 10, destX: 226, destY: 465},
    { x: 196, y: 465, radius: 10, destX: 226, destY: 347}
];

const abysses = [
    { x: 30,y: 2, width: 120, height: 39},
    { x: 30,y: 52, width: 120, height: 39},
    { x: 331, y: 2, width: 120, height: 29},
    { x: 212, y: 212, width: 118, height: 88}
];

const walls = [
    { x: 0, y: 0, width: 2, height: 480 }, // left wall of canvas
    { x: 0, y: 0, width: 480, height: 2 }, // upper wall of canvas
    { x: 478, y: 0, width: 2, height: 480 }, // right wall of canvas
    { x: 0, y: 478, width: 480, height: 2 }, // lower wall of canvas
    //inner walls of canvas
    { x: 0, y: 90, width: 150, height: 2 },
    { x: 0, y: 390, width: 90, height: 2 },
    { x: 30, y: 120, width: 120, height: 2 },
    { x: 30, y: 180, width: 60, height: 2 },
    { x: 30, y: 210, width: 180, height: 2 },
    { x: 30, y: 240, width: 60, height: 2 },
    { x: 30, y: 300, width: 150, height: 2 },
    { x: 30, y: 360, width: 30, height: 2 },
    { x: 30, y: 420, width: 120, height: 2 },
    { x: 30, y: 120, width: 2, height: 90 },
    { x: 30, y: 240, width: 2, height: 60 },
    { x: 30, y: 330, width: 2, height: 60 },
    { x: 30, y: 420, width: 2, height: 30 },
    { x: 60, y: 150, width: 60, height: 2 },
    { x: 60, y: 270, width: 60, height: 2 },
    { x: 60, y: 330, width: 150, height: 2 },
    { x: 60, y: 330, width: 2, height: 32 },
    { x: 60, y: 420, width: 2, height: 60 },
    { x: 90, y: 330, width: 2, height: 30 },
    { x: 90, y: 450, width: 210, height: 2 },
    { x: 120, y: 180, width: 60, height: 2 },
    { x: 120, y: 360, width: 30, height: 2 },
    { x: 120, y: 270, width: 2, height: 30 },
    { x: 150, y: 60, width: 30, height: 2 },
    { x: 150, y: 240, width: 60, height: 2 },
    { x: 150, y: 0, width: 2, height: 30 },
    { x: 150, y: 60, width: 2, height: 32 },
    { x: 150, y: 120, width: 2, height: 30 },
    { x: 150, y: 240, width: 2, height: 62 },
    { x: 150, y: 360, width: 2, height: 62 },
    { x: 180, y: 30, width: 30, height: 2 },
    { x: 180, y: 90, width: 30, height: 2 },
    { x: 180, y: 270, width: 30, height: 2 },
    { x: 180, y: 360, width: 90, height: 2 },
    { x: 180, y: 30, width: 2, height: 182 },
    { x: 180, y: 360, width: 2, height: 120 },
    { x: 210, y: 90, width: 120, height: 2 },
    { x: 210, y: 120, width: 60, height: 2 },
    { x: 210, y: 180, width: 30, height: 2 },
    { x: 210, y: 210, width: 120, height: 2 },
    { x: 210, y: 300, width: 120, height: 2 },
    { x: 210, y: 390, width: 90, height: 2 },
    { x: 210, y: 420, width: 240, height: 2 },
    { x: 210, y: 30, width: 2, height: 30 },
    { x: 210, y: 90, width: 2, height: 30 },
    { x: 210, y: 150, width: 2, height: 30 },
    { x: 210, y: 210, width: 2, height: 32 },
    { x: 210, y: 270, width: 2, height: 62 },
    { x: 210, y: 390, width: 2, height: 30 },
    { x: 240, y: 30, width: 90, height: 2 },
    { x: 240, y: 180, width: 60, height: 2 },
    { x: 240, y: 0, width: 2, height: 32 },
    { x: 240, y: 60, width: 2, height: 30 },
    { x: 240, y: 120, width: 2, height: 30 },
    { x: 240, y: 180, width: 2, height: 30 },
    { x: 240, y: 300, width: 2, height: 30 },
    { x: 270, y: 30, width: 2, height: 30 },
    { x: 270, y: 120, width: 2, height: 30 },
    { x: 270, y: 300, width: 2, height: 62 },
    { x: 300, y: 60, width: 2, height: 30 },
    { x: 300, y: 120, width: 30, height: 2 },
    { x: 300, y: 120, width: 2, height: 62 },
    { x: 300, y: 330, width: 2, height: 62 },
    { x: 330, y: 60, width: 150, height: 2 },
    { x: 330, y: 180, width: 30, height: 2 },
    { x: 330, y: 240, width: 30, height: 2 },
    { x: 330, y: 270, width: 30, height: 2 },
    { x: 330, y: 390, width: 90, height: 2 },
    { x: 330, y: 450, width: 30, height: 2 },
    { x: 330, y: 30, width: 2, height: 32 },
    { x: 330, y: 120, width: 2, height: 30 },
    { x: 330, y: 210, width: 2, height: 30 },
    { x: 330, y: 270, width: 2, height: 120 },
    { x: 330, y: 450, width: 2, height: 30 },
    { x: 360, y: 120, width: 32, height: 2 },
    { x: 360, y: 150, width: 60, height: 2 },
    { x: 360, y: 60, width: 2, height: 60 },
    { x: 360, y: 180, width: 2, height: 62 },
    { x: 360, y: 270, width: 2, height: 60 },
    { x: 360, y: 360, width: 2, height: 30 },
    { x: 360, y: 450, width: 2, height: 30 },
    { x: 390, y: 240, width: 60, height: 2 },
    { x: 390, y: 300, width: 60, height: 2 },
    { x: 390, y: 360, width: 30, height: 2 },
    { x: 390, y: 450, width: 90, height: 2 },
    { x: 390, y: 60, width: 2, height: 30 },
    { x: 390, y: 180, width: 2, height: 120 },
    { x: 390, y: 330, width: 2, height: 30 },
    { x: 420, y: 90, width: 30, height: 2 },
    { x: 420, y: 90, width: 2, height: 120 },
    { x: 420, y: 240, width: 2, height: 30 },
    { x: 420, y: 330, width: 2, height: 62 },
    { x: 450, y: 30, width: 2, height: 92 },
    { x: 450, y: 180, width: 2, height: 62 },
    { x: 450, y: 300, width: 2, height: 122 },
];

let allCoinsCollected = false;
const coins = [
    { x: 16, y: 16, radius: 7, collected: false },
    { x: 256, y: 16, radius: 7, collected: false },
    { x: 286, y: 16, radius: 7, collected: false },
    { x: 316, y: 16, radius: 7, collected: false },
    { x: 16, y: 46, radius: 7, collected: false },
    { x: 166, y: 46, radius: 7, collected: false },
    { x: 226, y: 46, radius: 7, collected: false },
    { x: 16, y: 76, radius: 7, collected: false },
    { x: 466, y: 76, radius: 7, collected: false },
    { x: 16, y: 106, radius: 7, collected: false },
    { x: 256, y: 106, radius: 7, collected: false },
    { x: 76, y: 136, radius: 7, collected: false },
    { x: 106, y: 136, radius: 7, collected: false },
    { x: 256, y: 136, radius: 7, collected: false },
    { x: 316, y: 136, radius: 7, collected: false },
    { x: 436, y: 166, radius: 7, collected: false },
    { x: 166, y: 196, radius: 7, collected: false },
    { x: 196, y: 196, radius: 7, collected: false },
    { x: 106, y: 226, radius: 7, collected: false },
    { x: 166, y: 256, radius: 7, collected: false },
    { x: 376, y: 256, radius: 7, collected: false },
    { x: 136, y: 286, radius: 7, collected: false },
    { x: 256, y: 316, radius: 7, collected: false },
    { x: 76, y: 346, radius: 7, collected: false },
    { x: 156, y: 346, radius: 7, collected: false },
    { x: 406, y: 346, radius: 7, collected: false },
    { x: 16, y: 376, radius: 7, collected: false },
    { x: 256, y: 406, radius: 7, collected: false },
    { x: 16, y: 436, radius: 7, collected: false },
    { x: 166, y: 436, radius: 7, collected: false },
    { x: 316, y: 436, radius: 7, collected: false },
    { x: 406, y: 466, radius: 7, collected: false },
    { x: 436, y: 466, radius: 7, collected: false }
];

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawPlatform(ctx) {
    ctx.fillStyle = "white"; // Farbe der Plattform
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
}

function drawGoal(ctx) {
    ctx.beginPath();
    ctx.arc(goal.x, goal.y, goal.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#00F700";
    ctx.fill();
    ctx.closePath();
}

function drawBallButton(ctx) {
    if (ballButton.pressed) {
        //draw black outline
        ctx.beginPath();
        ctx.arc(ballButton.x, ballButton.y, ballButton.radius, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        //purple filling
        ctx.beginPath();
        ctx.arc(ballButton.x, ballButton.y, ballButton.radius - 2, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    } else {
        //draw black outline
        ctx.beginPath();
        ctx.arc(ballButton.x, ballButton.y, ballButton.radius, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        //purple filling
        ctx.beginPath();
        ctx.arc(ballButton.x, ballButton.y, ballButton.radius - 2, 0, Math.PI * 2);
        ctx.fillStyle = "darkblue";
        ctx.fill();
        ctx.closePath();
    }
}

function drawPortals(ctx) {
    portals.forEach(portal => {
        //draw black outline
        ctx.beginPath();
        ctx.arc(portal.x, portal.y, portal.radius, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        //magenta filling
        ctx.beginPath();
        ctx.arc(portal.x, portal.y, portal.radius - 2, 0, Math.PI * 2);
        ctx.fillStyle = "magenta";
        ctx.fill();
        ctx.closePath();
    })
}

function drawAbysses(ctx) {
    ctx.fillStyle = "black";
    abysses.forEach(abyss => {
        ctx.fillRect(abyss.x, abyss.y, abyss.width, abyss.height);
    });
}

function drawWalls(ctx) {
    ctx.fillStyle = "grey";
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

window.addEventListener('keyup', () => {
    ball.vx = 0;
    ball.vy = 0;
});

//function to check whether ball and wall collide
function checkWallCollision(ball, wall) {
    return (
        ball.x + ball.radius >= wall.x &&
        ball.x - ball.radius <= wall.x + wall.width &&
        ball.y + ball.radius >= wall.y &&
        ball.y - ball.radius <= wall.y + wall.height
    );
}
//checks if the ball fell into an abyss
function checkAbyssCollision(abyss) {
    const inAbyssX = ball.x > abyss.x && ball.x < abyss.x + abyss.width;
    const inAbyssY = ball.y > abyss.y && ball.y < abyss.y + abyss.height;
    const ballOnPlatformX = ball.x > platform.x && ball.x < platform.x + platform.width;
    const ballOnPlatformY = ball.y > platform.y && ball.y < platform.y + platform.height;

    return ((inAbyssX && inAbyssY) && !(ballOnPlatformX && ballOnPlatformY));
}

//updates the coinCounter
function updateCoinCount() {
    let coinCountElement = document.getElementById("coinCounter2");
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

//check if the ball touches the goal
function checkGoalCollision() {
    const distX = ball.x - goal.x;
    const distY = ball.y - goal.y;
    const distance = Math.sqrt(distX * distX + distY * distY);

    return (distance <= goal.radius);
}
//checks if the ball pressed the button
function checkBallButtonCollision() {
    const distX = ball.x - goal.x;
    const distY = ball.y - goal.y;
    const distance = Math.sqrt(distX * distX + distY * distY);

    return (distance <= goal.radius);
}

function checkPortalCollision(portal) {
    const distX = ball.x - portal.x;
    const distY = ball.y - portal.y;
    const distance = Math.sqrt(distX * distX + distY * distY);

    return (distance <= portal.radius);
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
    abysses.forEach(abyss => {
        if (checkAbyssCollision(abyss)) {
        ball.x = spawnpoint.x;
        ball.y = spawnpoint.y;
    }
    })
    

    if (checkBallButtonCollision()) {
        ballButton.pressed = true;
        //move abyss to make path possible
        abysses[2].y = abysses[2].y + 30 * (canvas.width / 480);
    }

    portals.forEach(portal => {
        if (checkPortalCollision(portal)) {
            ball.x = portal.destX;
            ball.y = portal.destY;
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

function updatePlatformPosition() {
    platform.x += platform.speed * platform.direction;

    if (platform.x < platform.xStart || platform.x > platform.xEnd) {
        if (platform.delay > 0 ) {
            platform.delay = platform.delay - 1;
            platform.speed = 0;
        } else {
            platform.direction *= -1;
            platform.delay = 40;
            platform.speed = 0.4;
        }
    }
}

function gameLoop() {
    //update canvas by deleting and redrawing the elements
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWalls(ctx);
    checkCoinCollision(ball);
    drawCoins(ctx);
    drawAbysses(ctx);
    drawPortals(ctx);
    drawBallButton(ctx);
    if (isRunning) {
        updatePlatformPosition();
    }
    drawPlatform(ctx);
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
            let timerElement = document.getElementById("timer2");
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

function startGame() {
    window.addEventListener("devicemotion", handleMotion);
    startTimer();
    gameLoop();
}

document.addEventListener("DOMContentLoaded", () => {
    startGame(); // Startet das Spiel automatisch beim Laden der Seite
});

let isRunning = true;
let playPauseButton = document.getElementById("playPauseButton2");
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

    //update portals
    portals.forEach(portal => {
        portal.x = portal.x * adjustingFactor;
        portal.y = portal.y * adjustingFactor;
        portal.radius = portal.radius * adjustingFactor;
        portal.destX = portal.destX * adjustingFactor;
        portal.destY = portal.destY * adjustingFactor;
    })

    //update abysses
    abysses.forEach(abyss => {
        abyss.x = abyss.x * adjustingFactor;
        abyss.y = abyss.y * adjustingFactor;
        abyss.width = abyss.width * adjustingFactor;
        abyss.height = abyss.height * adjustingFactor;
    })

    //update ballButton
    ballButton.x = ballButton.x * adjustingFactor;
    ballButton.y = ballButton.y * adjustingFactor;
    ballButton.radius = ballButton.radius * adjustingFactor;

    //update moving plattform
    platform.x = platform.x * adjustingFactor;
    platform.xStart = platform.xStart * adjustingFactor;
    platform.xEnd = platform.xEnd * adjustingFactor;
    platform.y = platform.y * adjustingFactor;
    platform.width = platform.width * adjustingFactor;
    platform.height = platform.height * adjustingFactor;

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
        canvas.width = window.innerWidth - 40 ;
        canvas.height = canvas.width;

        //adjust size of gameobjects
        adjustGameObjects();
    }
}

resizeCanvas();

document.getElementById('restartButton').addEventListener('click'), () => {
    ball.x = spawnpoint.x;
    ball.y = spawnpoint.y;

    allCoinsCollected = false;
    coins.forEach(coin => {
        coin.collected = false;
    })
    updateCoinCount();

    ballButton.pressed = false;

    window.addEventListener("devicemotion", handleMotion);
    window.addEventListener('keydown', handleKeyPress);

    losingScreen.classList.remove('visible');
    gameScreen.classList.add('visible');
    document.getElementById("losingScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "flex";

    timer = timeLimit;
    startTimer();
}