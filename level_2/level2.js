//import of important functions
import { drawWalls } from "../gameUtils";

//select elements
const canvas = document.getElementById('level2Canvas');
const ctx = canvas.getContext('2d');

const spawnpoint = {x: 16, y: 226};

const ball = { x: spawnpoint.x, y: spawnpoint.y, radius: 6, vx: 0, vy: 0 };

const goal = { x: 286, y: 16, radius: 10 };

const ballButton = { x: 46, y: 437, radius: 10, pressed: false };

const portals = [
    { x: 465, y: 47, radius: 10 },
    { x: 106, y: 287, radius: 10 },
    { x: 226, y: 317, radius: 10 },
    { x: 196, y: 465, radius: 10 }
];

const abysses = [
    { x: 30,y: 2, width: 120, height: 39},
    { x: 30,y: 52, width: 120, height: 39},
    { x: 331, y: 2, width: 120, height: 29},
    { x: 212, y: 212, width: 29, height: 88},
    { x: 241, y: 212, width: 30, height: 88},
    { x: 271, y: 212, width: 30, height: 88},
    { x: 301, y: 212, width: 29, height: 88},
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
    { x: 30, y: 210, width: 150, height: 2 },
    { x: 30, y: 240, width: 60, height: 2 },
    { x: 30, y: 300, width: 120, height: 2 },
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
    { x: 180, y: 270, width: 30, height: 2 },
    { x: 180, y: 360, width: 90, height: 2 },
    { x: 180, y: 30, width: 2, height: 152 },
    { x: 180, y: 360, width: 2, height: 120 },
    { x: 210, y: 90, width: 120, height: 2 },
    { x: 210, y: 120, width: 60, height: 2 },
    { x: 210, y: 210, width: 120, height: 2 },
    { x: 210, y: 300, width: 120, height: 2 },
    { x: 210, y: 390, width: 90, height: 2 },
    { x: 210, y: 420, width: 240, height: 2 },
    { x: 210, y: 30, width: 2, height: 30 },
    { x: 210, y: 90, width: 2, height: 30 },
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

const traps = [];

const coins = [];

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
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

function gameLoop() {
    //update canvas by deleting and redrawing the elements
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWalls(ctx, walls);
    //checkCoinCollision(ball);
    //drawCoins(ctx);
    drawAbysses(ctx);
    drawPortals(ctx);
    drawBallButton(ctx);
    //drawTraps(ctx);
    /*
    if (allCoinsCollected) {
        drawGoal(ctx);
    }
        */
    drawBall();

    requestAnimationFrame(gameLoop); // Animations-Loop
}

function startGame() {
    gameLoop();
}

document.addEventListener("DOMContentLoaded", () => {
    startGame(); // Startet das Spiel automatisch beim Laden der Seite
});