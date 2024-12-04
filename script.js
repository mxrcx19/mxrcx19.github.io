// select elements
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const startButton = document.getElementById('startButton');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Event-Listener for start-button
startButton.addEventListener('click', () => {
    // Hide the start screen
    document.getElementById("startScreen").style.display = "none";

    // Show the game screen
    document.getElementById("gameScreen").style.display = "flex";
    startGame();
});


const ball = { x: 200, y: 200, radius: 10, vx: 0, vy: 0 };
function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function updateBall() {
    ball.x += ball.vx;
    ball.y += ball.vy;
    drawBall();
}

// Simulate movement with arrow keys
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowUp") ball.vy = -2;
    if (e.key === "ArrowDown") ball.vy = 2;
    if (e.key === "ArrowLeft") ball.vx = -2;
    if (e.key === "ArrowRight") ball.vx = 2;
});

window.addEventListener('keyup', () => {
    ball.vx = 0;
    ball.vy = 0;
});

setInterval(updateBall, 20);